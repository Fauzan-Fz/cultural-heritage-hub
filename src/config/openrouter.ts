/**
 * Integrasi klien OpenRouter.
 *
 * Bersifat Stateless: setiap panggilan (call) berdiri sendiri secara independen —
 * tidak ada penggabungan koneksi (connection pooling) atau memori sesi.
 * Menggunakan global `fetch` bawaan dari Node.js >= 18.
 *
 * File ini mengelola parameter integrasi ke OpenRouter API, penggunaan model gratisan,
 * dan juga penanganan kesalahan hulu (upstream error handler) seperti halnya kode 429.
 *
 * Docs: https://openrouter.ai/docs/api-reference/overview
 */

import { config } from "dotenv";

config();

/** Peran (roles) yang diizinkan dalam payload penyelesaian obrolan (chat-completions) OpenRouter. */
export type ChatRole = "system" | "user" | "assistant";

/** Pesan tunggal dalam sebuah percakapan chat-completions. */
export interface ChatMessage {
  readonly role: ChatRole;
  readonly content: string;
}

/** Tampilan bertipe kuat (strongly-typed) dari field-field yang benar-benar kita konsumsi dari API. */
interface Choice {
  readonly message?: { readonly content?: string };
  readonly delta?: { readonly content?: string };
}

interface ChatCompletionChunk {
  readonly choices?: readonly Choice[];
}

/** Dilempar ketika API OpenRouter mengembalikan respons selain 2xx. */
export class OpenRouterError extends Error {
  public readonly statusCode: number;
  public constructor(message: string, statusCode: number) {
    super(message);
    this.name = "OpenRouterError";
    this.statusCode = statusCode;
  }
}

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const API_KEY = process.env.OPENROUTER_API_KEY ?? "";
const DEFAULT_MODEL =
  process.env.AI_MODEL_NAME ?? "openai/gpt-oss-120b:free";

/**
 * Membaca nama model yang telah diselesaikan. Digunakan untuk payload diagnostik / pemeriksaan kesehatan.
 * Menjamin penggunaan model gratisan `openai/gpt-oss-120b:free` sebagai default.
 */
export function getModelName(): string {
  return DEFAULT_MODEL;
}

/** Bernilai benar (true) ketika kunci API OpenRouter telah dikonfigurasi. */
export function hasApiKey(): boolean {
  return API_KEY.trim().length > 0;
}

/**
 * Membangun header permintaan (request headers) standar OpenRouter.
 * Parameter `HTTP-Referer` + `X-Title` direkomendasikan oleh OpenRouter untuk
 * atribusi dan pemeringkatan papan peringkat pada tingkat penggunaan gratisan.
 */
function buildHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://cultural-heritage-hub.local",
    // ASCII only: HTTP header values are Latin-1 (ByteString); em-dashes etc.
    // are rejected by undici with "Cannot convert argument to a ByteString".
    "X-Title": "Cultural Heritage Hub - Cakra",
  };
}

interface CompletionOptions {
  readonly messages: readonly ChatMessage[];
  readonly model?: string;
  readonly temperature?: number;
  readonly maxTokens?: number;
  readonly signal?: AbortSignal;
}

/** Membaca dan mendekode tubuh (body) respons yang gagal menjadi pesan kesalahan yang dapat dibaca. */
async function readError(res: Response): Promise<string> {
  const raw = await res.text();
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: string } | string };
    if (typeof parsed.error === "string") return parsed.error;
    if (parsed.error?.message) return parsed.error.message;
  } catch {
    /* fall through to raw text */
  }
  return raw.trim() || res.statusText;
}

/**
 * Penyelesaian tidak mengalir (Non-streaming completion). Mengembalikan pesan asisten secara utuh.
 * Gunakan ini ketika Anda membutuhkan teks lengkap secara sekaligus.
 */
export async function fetchChatCompletion(
  options: CompletionOptions,
): Promise<string> {
  const { messages, model = DEFAULT_MODEL, temperature = 0.7, maxTokens, signal } = options;

  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(),
    signal,
    body: JSON.stringify({
      model,
      messages,
      temperature,
      ...(maxTokens !== undefined ? { max_tokens: maxTokens } : {}),
    }),
  });

  if (!res.ok) {
    throw new OpenRouterError(await readError(res), res.status);
  }

  const data = (await res.json()) as ChatCompletionChunk;
  const content = data.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new OpenRouterError("Malformed completion response: missing message content.", 502);
  }
  return content;
}

/**
 * Penyelesaian mengalir (Streaming completion). Memanggil `onChunk` dengan setiap bagian teks bertahap
 * (delta) saat teks tersebut tiba dari OpenRouter. Mengembalikan teks yang telah dirakit penuh setelah
 * aliran (stream) berakhir.
 *
 * Aliran OpenRouter menggunakan metode Server-Sent Events: setiap baris payload berupa
 * `data: {json}` atau `data: [DONE]`.
 */
export async function streamChatCompletion(
  options: CompletionOptions,
  onChunk: (delta: string) => void,
): Promise<string> {
  const {
    messages,
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens,
    signal,
  } = options;

  const res = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(),
    signal,
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true,
      ...(maxTokens !== undefined ? { max_tokens: maxTokens } : {}),
    }),
  });

  if (!res.ok) {
    throw new OpenRouterError(await readError(res), res.status);
  }
  if (res.body === null) {
    throw new OpenRouterError("Streaming response has no body.", 502);
  }

  const decoder = new TextDecoder("utf-8");
  let assembled = "";
  let buffer = "";

  for await (const rawChunk of res.body) {
    buffer += decoder.decode(rawChunk, { stream: true });

    // SSE frames are separated by a blank line. Process complete frames only.
    let newlineIndex = buffer.indexOf("\n");
    while (newlineIndex !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      newlineIndex = buffer.indexOf("\n");

      if (line.length === 0) continue;
      if (!line.startsWith("data:")) continue;

      const payload = line.slice("data:".length).trim();
      if (payload === "[DONE]") {
        return assembled;
      }

      try {
        const chunk = JSON.parse(payload) as ChatCompletionChunk;
        const delta = chunk.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length > 0) {
          assembled += delta;
          onChunk(delta);
        }
      } catch {
        // Skip malformed intermediate frames; SSE streams can split JSON.
      }
    }
  }

  return assembled;
}

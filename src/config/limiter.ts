/**
 * Middleware pembatasan laju ketukan pintu (Rate Limit) untuk Express.
 *
 * Dikonfigurasi melalui variabel lingkungan (environment variables).
 * Pembatasan laju ketukan pintu ini bekerja secara eksklusif di dalam memori lokal server.
 * Tujuan utamanya adalah untuk mengamankan kuota gratisan OpenRouter agar tidak terkuras habis
 * oleh serangan atau permintaan yang berlebihan dari satu alamat IP.
 * Nilai default bersifat konservatif (15 permintaan / menit per IP).
 */

import rateLimit, { type Options as RateLimitOptions } from "express-rate-limit";
import type { Request, Response } from "express";

function parsePositiveInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim().length === 0) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parsePositiveNumber(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim().length === 0) return fallback;
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

const WINDOW_MS = parsePositiveNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000);
const MAX_REQUESTS = parsePositiveInt(process.env.RATE_LIMIT_MAX, 15);

/**
 * Fungsi penanganan khusus untuk status 429 (Terlalu Banyak Permintaan).
 * Menjaga konsistensi struktur respons tubuh (body) dengan bagian API lainnya.
 */
function rateLimitHandler(_req: Request, res: Response): void {
  res.status(429).json({
    error: "Too many requests",
    message:
      "Cakra is busy greeting other guests right now. Please pause briefly and try again.",
    retryAfterSeconds: Math.ceil(WINDOW_MS / 1000),
  });
}

const baseOptions: Partial<RateLimitOptions> = {
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler,
};

/**
 * Middleware Rate Limiter yang diterapkan pada titik akhir (endpoint) `/api/v1/chat` yang dilindungi.
 * Ini memastikan penggunaan kuota OpenRouter tetap aman terkendali di dalam memori lokal.
 */
export const chatLimiter = rateLimit({
  ...baseOptions,
  message:
    "Too many chat requests from this IP, please try again shortly.",
});

export { WINDOW_MS as RATE_LIMIT_WINDOW_MS, MAX_REQUESTS as RATE_LIMIT_MAX };

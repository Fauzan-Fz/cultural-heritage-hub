/**
 * Titik masuk aplikasi (Entry Point) — Backend Cultural Heritage Hub.
 *
 * File ini menangani inisialisasi server Express yang bersifat stateless untuk melayani
 * Cakra, sang Kurator Budaya Digital. Alur kerjanya mencakup pembacaan konfigurasi `.env`,
 * penanganan rute statis, penanganan rute dokumentasi Scalar, dan proses penutupan
 * server secara anggun (graceful shutdown).
 */

import cors from "cors";
import express, { type Request, type Response } from "express";

import { config } from "dotenv";
import { hasApiKey, getModelName } from "./config/openrouter.js";
import {
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "./config/limiter.js";
import apiRouter from "./routes/api.js";
import { healthHandler } from "./controllers/chat.controller.js";
import { apiReference } from "@scalar/express-api-reference";
import { openApiSpecObject } from "./docs/openapi.js";

// Membaca dan memuat variabel dari file .env ke dalam process.env
config();

const app = express();

// Percayai hop proxy pertama agar req.ip dan pembatasan laju (rate limiting) berfungsi di balik penyedia hosting seperti Render/Railway/dll.
app.set("trust proxy", 1);

/* ────────────── Middleware Inti ────────────── */

/**
 * Middleware CORS (Cross-Origin Resource Sharing) — Keamanan Akses API.
 *
 * Middleware ini bertugas membatasi hak akses API agar hanya dapat diakses
 * oleh domain frontend resmi yang telah terdaftar. Di lingkungan produksi,
 * nilai `CORS_ORIGIN` wajib diisi dengan domain resmi (misalnya:
 * https://www.testdomain.id/) untuk mencegah permintaan dari
 * sumber yang tidak sah. Di lingkungan development lokal, jika variabel
 * tersebut kosong atau tidak didefinisikan, akses dari semua origin (*)
 * diizinkan secara sementara agar proses pengembangan tidak terhambat.
 */
const allowedOrigin = process.env.CORS_ORIGIN?.trim() || "*";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-secret-key"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Pencatat permintaan (request logger) sederhana (dilewati saat pengujian).
app.use((req, _res, next) => {
  if (process.env.NODE_ENV !== "test") {
    // eslint-disable-next-line no-console
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  }
  next();
});

/* ────────────── Rute-Rute ────────────── */
// Pemeriksaan kelayakan (liveness probe) publik pada path root konvensional.
app.get("/healthz", healthHandler);

// Rute aplikasi yang telah diberi versi.
app.use("/api", apiRouter);

// Penanganan rute Scalar docs: Diaktifkan hanya jika SCALAR_DOCS_ENABLED bernilai "true".
if (process.env.SCALAR_DOCS_ENABLED === "true") {
  app.use(
    "/docs",
    apiReference({
      spec: {
        content: openApiSpecObject,
      },
    })
  );
}

/* ────────────── Penanganan 404 + Error ────────────── */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: "The cultural path you seek does not exist on this server.",
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: express.NextFunction) => {
  // Body-parser / JSON syntax errors surface here.
  if (err instanceof SyntaxError && "body" in err && err.message.includes("JSON")) {
    res.status(400).json({ error: "Bad Request", message: "Malformed JSON body." });
    return;
  }
  // eslint-disable-next-line no-console
  console.error("[unhandled]", err);
  res.status(500).json({ error: "Internal Server Error", message: "Unexpected error." });
});

/* ────────────── Proses Booting ────────────── */
const PORT = Number.parseInt(process.env.PORT ?? "5000", 10) || 5000;

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log("─".repeat(64));
  console.log(`🏛️  Cultural Heritage Hub backend running`);
  console.log(`   Port:           ${PORT}`);
  console.log(`   NODE_ENV:       ${process.env.NODE_ENV ?? "(unset)"}`);
  console.log(`   Model:          ${getModelName()}`);
  console.log(`   API key set:    ${hasApiKey() ? "yes" : "NO ⚠️"}`);
  console.log(
    `   Static auth:    ${process.env.APP_DEMO_AUTH_SECRET?.trim() ? "enabled" : "bypassed (local dev)"}`,
  );
  console.log(
    `   Rate limit:     ${RATE_LIMIT_MAX} req / ${Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)}s per IP`,
  );
  console.log(`   Health:         http://localhost:${PORT}/healthz`);
  console.log(`   Welcome:        http://localhost:${PORT}/api/v1/welcome`);
  console.log(`   Chat:           POST  http://localhost:${PORT}/api/v1/chat`);
  console.log("─".repeat(64));
});

/**
 * Menutup server secara anggun (graceful shutdown).
 * Menghentikan penerimaan permintaan baru dan membiarkan permintaan yang ada selesai.
 */
function shutdown(signal: string): void {
  // eslint-disable-next-line no-console
  console.log(`\nSinyal ${signal} diterima — melakukan penutupan secara anggun (graceful shutdown)...`);
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log("Server ditutup. Selamat tinggal!");
    process.exit(0);
  });
}

// Menangkap sinyal terminasi untuk penutupan server secara anggun
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

export { app, server };

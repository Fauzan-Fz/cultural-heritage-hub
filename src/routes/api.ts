/**
 * Definisi rute API bervesrsi untuk backend Cultural Heritage Hub.
 *
 * Dipasang di bawah path "/api" oleh titik masuk (entry point) aplikasi, sehingga rute di bawah ini mengarah ke:
 *   GET  /api/v1/welcome
 *   POST /api/v1/chat
 *
 * Probe kelayakan /healthz (publik) dipasang secara terpisah di path root di dalam file index.ts.
 */

import { Router } from "express";

import { chatLimiter } from "../config/limiter.js";
import {
  chatHandler,
  requireStaticAuth,
  welcomeHandler,
} from "../controllers/chat.controller.js";

export const apiRouter = Router();

// Sapaan budaya acak yang bersifat publik.
apiRouter.get("/v1/welcome", welcomeHandler);

// Obrolan stateless dengan Cakra yang dilindungi dengan tingkat keamanan (rate-limited) dan otentikasi.
apiRouter.post("/v1/chat", chatLimiter, requireStaticAuth, chatHandler);

export default apiRouter;

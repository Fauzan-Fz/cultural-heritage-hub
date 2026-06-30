/**
 * Spesifikasi OpenAPI 3.0.0 — Cultural Heritage Hub API.
 *
 * Array `servers` dikonfigurasi secara dinamis berdasarkan variabel lingkungan:
 * - Produksi : mengarah ke domain frontend resmi (https://www.bukittinggiheritage.id/)
 *   sehingga Scalar UI menampilkan URL yang benar saat diakses oleh pengguna akhir.
 * - Development: mengarah ke alamat localhost dengan port aktif dari konfigurasi `.env`
 *   agar pengembang dapat menguji endpoint langsung dari mesin lokal.
 */

const isProd = process.env.NODE_ENV === "production";
const port = process.env.PORT ?? "5000";

/**
 * Menentukan URL server utama secara dinamis sesuai lingkungan aktif.
 * Produksi → domain resmi. Development → localhost dengan port aktif.
 */
const serverUrl = isProd
  ? "https://www.bukittinggiheritage.id/"
  : `http://localhost:${port}`;

const serverDescription = isProd
  ? "Production — Domain Resmi Cultural Heritage Hub"
  : `Development — Lokal (port ${port})`;

export const openApiSpecObject = {
  openapi: "3.0.0",
  info: {
    title: "Cultural Heritage Hub API",
    version: "1.0.0",
    description: "Stateless Express + TypeScript backend powering Cakra, the Digital Cultural Curator.",
  },
  servers: [
    {
      url: serverUrl,
      description: serverDescription,
    },
  ],
  components: {
    securitySchemes: {
      ApiSecretKey: {
        type: "apiKey",
        in: "header",
        name: "x-api-secret-key",
        description: "Static Master Key Protection for protected routes.",
      },
    },
  },
  paths: {
    "/healthz": {
      get: {
        summary: "Liveness probe",
        description: "Public endpoint returning health status.",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "OK",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/welcome": {
      get: {
        summary: "Welcome greeting",
        description: "Public endpoint returning a randomized cultural greeting string.",
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "text/plain": {
                schema: {
                  type: "string",
                  example: "Welcome to the Cultural Heritage Hub!",
                },
              },
            },
          },
        },
      },
    },
    "/api/v1/chat": {
      post: {
        summary: "Chat with Cakra",
        description: "Protected endpoint to interact with the Digital Cultural Curator.",
        security: [
          {
            ApiSecretKey: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Single message string.",
                  },
                  messages: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        role: { type: "string" },
                        content: { type: "string" },
                      },
                    },
                    description: "Array of chat messages.",
                  },
                },
                example: {
                  message: "Tell me about Minangkabau culture.",
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Successful chat response",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    reply: {
                      type: "string",
                      example: "Minangkabau culture is known for...",
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Unauthorized - Invalid or missing x-api-secret-key",
          },
          "429": {
            description: "Too Many Requests - Rate limit exceeded",
          },
          "500": {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
};

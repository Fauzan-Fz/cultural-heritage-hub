# Cultural Heritage Backend

This is the stateless Express and TypeScript backend powering **Cakra**, the Digital Cultural Curator for the Cultural Heritage Hub focusing on Bukittinggi (Minangkabau) and Bali.

## Tech Stack

*   Node.js
*   TypeScript
*   Express
*   Scalar
*   OpenRouter

## Environment Variables Configuration

To run the application, configure the following environment variables in a `.env` file at the root of the project:

```env
PORT=5000
NODE_ENV=development

# OpenRouter configuration
OPENROUTER_API_KEY=your_openrouter_api_key
AI_MODEL_NAME=openai/gpt-oss-120b:free

# Rate limiting configuration
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=15

# Security and Documentation
APP_DEMO_AUTH_SECRET=your_secret_key
SCALAR_DOCS_ENABLED=true
```

## How to Run the Project (Tata Cara Menjalankan)

### Development Mode

Run the following command to start the server in development mode with hot-reloading:

```bash
pnpm run dev
```

### Production Mode

For production, compile the TypeScript source code and execute the build output:

```bash
pnpm run build
pnpm run start
```

## API Endpoints Summary

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/healthz` | `GET` | Public liveness probe returning health status. |
| `/api/v1/welcome` | `GET` | Public endpoint returning a randomized cultural greeting string. |
| `/api/v1/chat` | `POST` | Protected endpoint for interacting statelessly with Cakra. |

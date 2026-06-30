<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your app

This project no longer needs a separate Express/Nest backend.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `GEMINI_API_KEY` in `.env` or `.env.local`
3. Run the app:
   `npm run dev`

## API flow

- Frontend calls `/api/chat`
- In local Vite dev, `vite.config.ts` mounts middleware and routes `/api/chat` into [server/chatHandler.ts](server/chatHandler.ts)
- On Vercel, `/api/chat` is handled by [api/chat.ts](api/chat.ts)

In short: just run the frontend app and make sure `GEMINI_API_KEY` exists in the environment.

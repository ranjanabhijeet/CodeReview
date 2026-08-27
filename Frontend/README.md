# Code Reviewer Frontend

React + Vite frontend for the Code Reviewer app. Users can paste JavaScript code, request an AI review, and read structured feedback returned by the backend.

## Features

- Code editor with syntax highlighting
- AI-powered review output with Markdown rendering
- Copy-code action
- Loading state while the review is being generated
- Local API configuration through environment variables

## Tech Stack

- React
- Vite
- Axios
- PrismJS
- React Markdown
- React Icons

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend usually runs at:

```text
http://127.0.0.1:5173/
```

## Backend URL

In development, the frontend defaults to:

```text
http://localhost:3000
```

For production, set this environment variable in Vercel:

```text
VITE_API_BASE_URL=https://your-backend-url
```

If `VITE_API_BASE_URL` is not set in production, the app falls back to:

```text
https://codereview-s9wv.onrender.com
```

## Available Scripts

Run locally:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run lint checks:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
Frontend/
  public/
  src/
    App.jsx
    App.css
    index.css
    main.jsx
  package.json
  vite.config.js
```

## Deployment

This frontend can be deployed on Vercel. Make sure the backend is deployed separately and `VITE_API_BASE_URL` points to the live backend service.

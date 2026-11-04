# Congyu Zhao Portfolio

Independent portfolio website for congyuzhao.com.

## Important separation

This repository is intentionally independent from Aspire 101. It has no shared code, environment variables, deployment configuration, or infrastructure dependencies with Aspire 101.

## Local development

```bash
npm install
npm run dev
```

## Deployment

Designed for a dedicated Vercel project named `congyuzhao-portfolio`.

## Production smoke checks

Run `npm run check:live` after a production deployment, or pass a preview URL:

```bash
npm run check:live -- https://congyuzhao.com
npm run check:live -- https://your-preview.vercel.app
```

This checks the homepage, project index, six case-study routes, and seven portfolio image assets for successful public HTTP responses. It requires Node.js 18+ and no private tokens. A failed check exits nonzero.

The smoke script is a **network and content check**, not a replacement for visual review, responsive browser testing, or an accessibility audit.

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

## Automated browser QA

GitHub Actions workflow [Portfolio public smoke test](https://github.com/skrgulang/congyuzhao-portfolio/actions/workflows/portfolio-smoke.yml) runs on changes to the QA scripts/workflow, can be started manually, and is scheduled daily at 13:23 UTC.

In addition to the HTTP checks, it launches Chromium with 390px mobile and 1440px desktop viewports to check the homepage, projects index, and all six project detail pages for horizontal overflow, above-the-fold broken images, mobile menu behavior, and the Fish and Ships image lightbox (open, next image, Escape to close). It saves full-page screenshots to a **portfolio-qa-screenshots** Actions artifact (retained for seven days).

These automated checks cannot establish a full visual quality pass or verify authenticated product screens. A human should inspect screenshots and test Safari/iOS separately. GitHub Actions must be enabled for this repository for the workflow to run.

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

This checks the homepage, project index, six case-study routes, seven portfolio image assets, and the custom 404 recovery page for successful public HTTP responses. It requires Node.js 18+ and no private tokens. A failed check exits nonzero.

The smoke script is a **network and content check**, not a replacement for visual review, responsive browser testing, or an accessibility audit.

## Automated browser QA

GitHub Actions workflow [Portfolio public smoke test](https://github.com/skrgulang/congyuzhao-portfolio/actions/workflows/portfolio-smoke.yml) runs on changes to website source, public images, or QA scripts/workflow, can be started manually, and is scheduled daily at 13:23 UTC.

In addition to the HTTP checks, it launches Chromium with 320px small-mobile, 390px mobile, and 1440px desktop viewports to check the homepage, projects index, and all six project detail pages for horizontal overflow, above-the-fold broken images, mobile menu behavior, and the Fish and Ships image lightbox (open, next image, Escape to close). It saves full-page screenshots to a **portfolio-qa-screenshots** Actions artifact (retained for seven days).

These automated checks cannot establish a full visual quality pass or verify authenticated product screens. A human should inspect screenshots and test Safari/iOS separately. GitHub Actions must be enabled for this repository for the workflow to run.

On pushes to main, the workflow pauses briefly before checking the public production URL so Vercel has time to publish. This is a best-effort delay, not a guarantee that the newly pushed commit is live; always distinguish GitHub Actions results from Vercel deployment status.

## Release handoff: remaining owner-side items (2026-11-17)

- **Live PDF release verification:** After the binary PDF files are committed and deployed, run `npm run check:resume:live -- https://congyuzhao.com`. This command fetches *both public URLs* and exits unsuccessfully unless their actual SHA-256 checksums both equal the uploaded original. A successful Vercel build by itself does not pass this release gate.
- **Resume original PDF (verified restore command):** Upload the *unmodified* original PDF into a local checkout or Codespaces workspace, then run `npm run restore:resume -- "/path/to/Congyu Zhao — Resume (5)(1).pdf"`. The script refuses mismatched SHA-256 files, replaces both public PDF aliases with exact bytes, and verifies the installed hashes. Commit the two PDF files, push to `main`, then confirm the public URL serves the same SHA-256. The restore command does **not** upload files to GitHub by itself.
- **Resume original PDF:** The exact uploaded file `Congyu Zhao — Resume (5)(1).pdf` has SHA-256 `375deed86cca7d8bf23bc23f92151e11a8cf40a30245107039157a95c5d5cced`. Replace both `public/Congyu_Zhao_Resume.pdf` and `public/Congyu_Zhao_Resume_Uploaded.pdf` with its *identical binary bytes* (do not re-export or regenerate). Run `npm run check:media` and `npm run check:live`, and verify that the public download serves the same bytes. The existing check warns when the main PDF differs from the uploaded original.
- **Mini Game 03 access (rechecked 2026-11-17):** A fresh signed-out browser visit to `https://www.youtube.com/watch?v=3z4tX81RsAE` did **not** show the earlier private-video message. Instead YouTube displayed **“Sign in to confirm you're not a bot”** and prevented playback. This is a YouTube anti-bot/login gate rather than evidence the uploader set the video to Private. The player already exposes **Watch original on YouTube** as a fallback. Retest playback with a normal authenticated viewer session and on an ordinary personal device before marking the video verified.
- **Actual mobile devices:** Complete a hands-on visual and interaction check using iPhone Safari and Android Chrome for `/`, `/projects`, `/videos?game=03`, `/resume` and `/projects/aspire-101`. Existing Playwright WebKit and Chromium jobs are engine-based checks, not physical-device testing.
- **Social share validation:** Run `npm run check:live` and verify all six `/videos?game=NN` pages serve distinct canonical, Open Graph and Twitter metadata. This does not guarantee immediate updates in LinkedIn's cached previews.

Do not mark the release handoff fully complete until the original PDF, actual YouTube playback in a regular browser, and physical-device tasks are verified.

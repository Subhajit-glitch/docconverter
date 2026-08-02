# DocConvert

DocConvert is a focused Next.js app for converting PDFs to editable DOCX files and DOCX files to PDFs. It deliberately does not promise pixel-perfect fidelity: complex layouts, tables, image-heavy documents, and scanned PDFs may need review.

## Requirements

- Node.js 20.9 or later (Node 22 recommended)
- npm 10 or later
- LibreOffice installed and available as `soffice` for DOCX-to-PDF local conversion

## Local setup

```bash
git clone <your-repository-url>
cd docconvert
cp .env.example .env.local
pnpm install
pnpm dev
```

Open `http://localhost:3000`. On Windows, copy `.env.example` to `.env.local` in File Explorer or use `Copy-Item .env.example .env.local`.

## Environment variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `MAX_UPLOAD_BYTES` | Maximum incoming document size in bytes | `10485760` (10 MiB) |
| `FILE_RETENTION_MS` | Automatic deletion period | `3600000` (one hour) |
| `DOCUMENT_STORAGE_DIR` | Private temporary directory | `./uploads` |
| `LIBREOFFICE_PATH` | LibreOffice/soffice executable | `soffice` |
| `STORAGE_PROVIDER` | Storage adapter selection for future provider integration | `local` |

Never commit `.env.local` or upload directories. The local storage adapter is intended for development or a persistent Node server. Vercel's filesystem is ephemeral and serverless functions cannot reliably run LibreOffice; use a managed object storage adapter and a conversion provider implementation before using this app for Vercel production traffic.

## Commands

```bash
pnpm lint
pnpm test
pnpm build
pnpm start
```

## Security model

The API checks extension, browser MIME type, signatures, size, basic PDF corruption markers, and PDF encryption markers. Files are written outside public assets with restrictive permissions, conversion jobs are rate-limited per IP in-memory, contents are never logged, and job folders are deleted after the configured retention period. For multi-instance production deployments, replace the in-memory rate limiter/job map with Redis and durable private object storage plus a scheduled cleanup job.

## Conversion limitations

- PDF-to-DOCX extracts selectable text and creates a DOCX; it does not reconstruct complex layouts or tables.
- Scanned PDFs require OCR. See `lib/converters/ocr.ts` for the integration point.
- DOCX-to-PDF uses LibreOffice headless locally. Configure a provider in `lib/converters` for serverless production.
- Password-protected PDFs are rejected.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it in Vercel and select the Next.js preset.
3. Add `MAX_UPLOAD_BYTES`, `FILE_RETENTION_MS`, and your production `STORAGE_PROVIDER` credentials in Vercel Project Settings ? Environment Variables.
4. Implement and select a persistent storage adapter and a serverless-compatible conversion provider (the current LibreOffice adapter is local-development only); do not rely on Vercel's ephemeral filesystem for retained downloads.
5. Deploy. Vercel runs `pnpm build` automatically.

## GitHub

The included GitHub Actions workflow runs linting, tests, and a production build for every push and pull request.


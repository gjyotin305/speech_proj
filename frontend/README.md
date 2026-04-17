# speech-proj frontend

Local fork of the `moshi/client` frontend, customized for running entirely on your own machine.

## Prerequisites

- Node.js `v20.12.2` (see `.nvmrc`). If you use nvm, run `nvm use`.
- A backend (the moshi worker / queue API) reachable from your machine. By default this client expects it on `http://localhost:8088`.

## Quick start (plain HTTP, localhost only)

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Configuration

Edit `.env.local`:

| Variable              | Purpose                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `VITE_QUEUE_API_PATH` | Path the client hits for the queue API (proxied by Vite). Default `/api`. |
| `VITE_QUEUE_API_URL`  | Upstream URL the `/api` proxy forwards to (your backend).               |
| `VITE_HOST`           | Host Vite binds to. Default `localhost`. Use `0.0.0.0` for LAN access.  |
| `VITE_PORT`           | Dev server port. Default `5173`.                                        |
| `VITE_USE_HTTPS`      | Set to `true` to force HTTPS (requires `cert.pem` and `key.pem`).       |

## Skipping the queue (direct worker)

Once running, go to `/?worker_addr={WORKER_ADDR}` to bypass the queue, e.g.
`http://localhost:5173/?worker_addr=localhost:8088`.

## Optional: running with HTTPS locally

To enable it:

1. Generate a self-signed cert at the project root:

   ```bash
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout key.pem -out cert.pem \
     -subj "/C=US/ST=State/L=City/O=Dev/CN=localhost"
   ```

2. Run `npm run dev`. Vite will auto-detect the cert files and switch to HTTPS.
3. Your browser will warn about the self-signed cert — click through the warning once.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check + production build to `dist/`
- `npm run preview` — preview the built bundle
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run prettier` — format with Prettier

## License

MIT, inherited from the upstream moshi client.

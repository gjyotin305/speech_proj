import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { ProxyOptions, defineConfig, loadEnv } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const certPath = resolve(process.cwd(), "cert.pem");
  const keyPath = resolve(process.cwd(), "key.pem");
  const hasCerts = existsSync(certPath) && existsSync(keyPath);

  // HTTPS is only enabled if you explicitly drop cert.pem + key.pem at the
  // project root, OR if you set VITE_USE_HTTPS=true. Otherwise Vite runs
  // over plain HTTP, which works fine for local dev on `localhost` because
  // browsers treat localhost as a secure context (mic access still works).
  const wantHttps = env.VITE_USE_HTTPS === "true" || hasCerts;
  const httpsConfig =
    wantHttps && hasCerts
      ? {
          cert: readFileSync(certPath),
          key: readFileSync(keyPath),
        }
      : undefined;

  const proxyConf: Record<string, string | ProxyOptions> = env.VITE_QUEUE_API_URL
    ? {
        "/api": {
          target: env.VITE_QUEUE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      }
    : {};

  return {
    server: {
      host: env.VITE_HOST ?? "localhost",
      port: env.VITE_PORT ? Number(env.VITE_PORT) : 5173,
      https: httpsConfig,
      proxy: {
        ...proxyConf,
      },
    },
    plugins: [
      topLevelAwait({
        promiseExportName: "__tla",
        promiseImportName: i => `__tla_${i}`,
      }),
    ],
  };
});

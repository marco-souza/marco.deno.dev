// deno-lint-ignore-file
import { cacheMiddleware } from "~/middlewares/cache.ts";
import { time } from "~/constants.ts";
import { serveStatic } from "hono/deno";
import { Hono } from "hono";

export async function setupStaticFiles(app: Hono) {
  // serving static files
  app.use("/static/*", serveStatic({ root: "./" }));
  app.use("/favicon.ico", serveStatic({ path: "./static/favicon.ico" }));

  // setup servicee worker
  app.use(
    "/sw-register.js",
    serveStatic({ path: "./static/js/sw-register.js" }),
  );
  app.use(
    "/sw.js",
    serveStatic({ path: "./static/js/service-worker.js" }),
  );

  // setup cache
  app.use("/static/js/*", cacheMiddleware());
  app.use("/static/css/*", cacheMiddleware(7 * time.DAY)); // 1 week
}

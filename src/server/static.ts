// deno-lint-ignore-file
import { cacheMiddleware } from "~/middlewares/cache.ts";
import { time } from "~/constants.ts";
import { serveStatic } from "hono/deno";
import { Hono } from "hono";

export async function setupStaticFiles(app: Hono) {
  // serving static files
  app.use("/static/*", serveStatic({ root: "./" }));
  app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));

  // setup cache
  app.use("/static/js/*", cacheMiddleware());
  app.use("/static/css/*", cacheMiddleware(7 * time.DAY)); // 1 week
}

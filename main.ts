import { Hono } from "hono";
import { serveStatic } from "hono/deno";
import { cacheMiddleware } from "~/middlewares/cache.ts";
import { time } from "~/constants.ts";

const app = new Hono();

// serving static files
app.use("/static/*", serveStatic({ root: "./" }));

// setup cache
app.use("/static/*", cacheMiddleware());
app.use("/static/css/*", cacheMiddleware(7 * time.DAY)); // 1 week

// setup route pages
const routesDir = Deno.env.get("ROUTES_DIR") || "routes";
try {
  for await (const page of Deno.readDir(routesDir)) {
    const importPath = `./${routesDir}/${page.name}`;
    const { definePage } = await import(importPath);

    definePage(app);

    console.info(`I: Registered: ${importPath}`);
  }
} catch (e) {
  console.error("E: Registering route:", e);
}

Deno.serve(app.fetch);

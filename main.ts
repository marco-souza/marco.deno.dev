import { Hono } from "hono";

const app = new Hono();

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

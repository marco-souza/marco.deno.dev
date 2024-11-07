import { Hono } from "hono";
import { jsxMiddleware } from "~/middlewares/jsx.ts";

export async function registerPageRoutes(app: Hono) {
  const routesDir = Deno.env.get("ROUTES_DIR") || "src/routes";
  try {
    app.use("/*", jsxMiddleware);

    for await (const page of Deno.readDir(routesDir)) {
      const importPath = `#/${routesDir}/${page.name}`;
      const { definePage } = await import(importPath);

      definePage(app);

      console.info(`I: Registered: ${importPath}`);
    }
  } catch (e) {
    console.error("E: Registering route:", e);
  }
}

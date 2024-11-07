import { Hono } from "hono";
import { jsxMiddleware } from "~/middlewares/jsx.ts";

export async function registerPageRoutes(app: Hono) {
  try {
    app.use("/*", jsxMiddleware);

    for await (const page of Deno.readDir("./src/routes")) {
      const importPath = `../routes/${page.name}`;
      const { definePage } = await import(importPath);

      definePage(app);

      console.info(`I: Registered: ${importPath}`);
    }
  } catch (e) {
    console.error("E: Registering route:", e);
  }
}

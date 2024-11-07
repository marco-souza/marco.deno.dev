import { Hono } from "hono";

export async function registerPageRoutes(app: Hono) {
  const routesDir = Deno.env.get("ROUTES_DIR") || "src/routes";
  try {
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

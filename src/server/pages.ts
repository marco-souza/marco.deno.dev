import type { Hono } from "hono";
import { jsxMiddleware } from "~/middlewares/jsx.ts";
import { themeMiddleware } from "~/middlewares/theme.ts";

export async function registerPageRoutes(app: Hono) {
  app.use("/*", jsxMiddleware); // enhanced jsx
  app.use("/*", themeMiddleware); // handle theme

  const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") ?? false;
  if (isDenoDeploy) {
    console.info("I: Skipping page routes registration on Deno Deploy");

    await import("~/routes/index.tsx").then((m) => m.definePage(app));

    return;
  }

  try {
    for await (const page of Deno.readDir("./src/routes")) {
      const importPath = `~/routes/${page.name}`;
      const { definePage } = await import(importPath);

      definePage(app);

      console.info(`I: Registered: ${importPath}`);
    }
  } catch (e) {
    console.error("E: Registering route:", e);
  }
}

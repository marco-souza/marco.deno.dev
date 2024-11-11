import { Hono } from "hono";
import { registerPageRoutes } from "~/server/pages.ts";
import { setupStaticFiles } from "~/server/static.ts";
import { generateTailwindTokens } from "~/server/tailwind.ts";
import { showRoutes } from "hono/dev";

export async function start() {
  const app = new Hono();

  await generateTailwindTokens();
  await setupStaticFiles(app);
  await registerPageRoutes(app);

  Deno.serve(app.fetch);

  showRoutes(app);
}

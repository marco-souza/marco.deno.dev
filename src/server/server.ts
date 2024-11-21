import { Hono } from "hono";
import { registerPageRoutes } from "~/server/pages.tsx";
import { setupStaticFiles } from "~/server/static.ts";
import { generateTailwindTokens } from "~/server/tailwind.ts";
import { showRoutes } from "hono/dev";
import { add } from "@m3o/auth";

console.log("Add 2 + 3 =", add(2, 3));

export async function start() {
  const app = new Hono();

  await generateTailwindTokens();
  await setupStaticFiles(app);

  registerPageRoutes(app);

  // register cron jobs
  Deno.cron("tick", "* * * * *", () => {
    console.log("Cron job tick");
  });

  Deno.serve(app.fetch);

  showRoutes(app);
}

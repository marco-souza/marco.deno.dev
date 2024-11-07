import { Hono } from "hono";
import { generateTailwindTokens } from "~/server/tailwind.ts";
import { setupStaticFiles } from "~/server/static.ts";
import { registerPageRoutes } from "~/server/pages.ts";

await generateTailwindTokens();

const app = new Hono();

await setupStaticFiles(app);
await registerPageRoutes(app);

Deno.serve(app.fetch);

import { Hono } from "hono";
import { registerPageRoutes } from "~/server/pages.tsx";
import { registerAuthRoutes } from "~/server/auth.tsx";
import { registerPrivateRoutes } from "~/server/private/routes.tsx";
import { setupStaticFiles } from "~/server/static.ts";
import { generateTailwindTokens } from "~/server/tailwind.ts";

import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { errorsMiddleware } from "~/middlewares/errors.tsx";

export async function start() {
  const app = new Hono();

  await generateTailwindTokens();
  await setupStaticFiles(app);

  app.use(logger());
  app.use(errorsMiddleware);

  // setup routes
  registerPageRoutes(app);
  registerAuthRoutes(app);
  registerPrivateRoutes(app);

  // register cron jobs
  Deno.cron("tick", "* * * * *", () => {
    console.log("Cron job tick");
  });

  Deno.serve(app.fetch);

  showRoutes(app);
}

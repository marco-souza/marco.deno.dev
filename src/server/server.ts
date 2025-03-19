import { Hono } from "hono";
import { registerPageRoutes } from "~/server/pages.tsx";
import { registerAuthRoutes } from "~/server/auth.tsx";
import { registerPrivateRoutes } from "~/server/private/routes.tsx";
import { setupStaticFiles } from "~/server/static.ts";
import { generateTailwindTokens } from "~/server/tailwind.ts";

import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { errorsMiddleware } from "~/middlewares/errors.tsx";

export async function setup() {
  const app = new Hono();

  await generateTailwindTokens();
  await setupStaticFiles(app);

  app.use(logger());
  app.use(errorsMiddleware);

  // setup routes
  registerPageRoutes(app);
  registerAuthRoutes(app);
  registerPrivateRoutes(app);

  showRoutes(app);

  // cron
  setupCron();

  return app;
}

function setupCron() {
  // register cron jobs
  Deno.cron("tick", "* * * * *", () => {
    console.log("Cron job tick");
  });
}

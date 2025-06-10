import { Hono } from "hono";
import { registerPageRoutes } from "~/server/pages.tsx";
import { registerAuthRoutes } from "~/server/auth.tsx";
import { registerPrivateRoutes } from "~/server/private/routes.tsx";
import { setupStaticFiles } from "~/server/static.ts";
import { generateTailwindTokens } from "~/server/tailwind.ts";

import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { etag } from "hono/etag";

import { errorsMiddleware } from "~/middlewares/errors.tsx";
import { sendMessageToChannel } from "~/internal/discord.ts";
import { fetchRandomGif } from "~/internal/giphy.ts";

export async function setup() {
  const app = new Hono();

  await generateTailwindTokens();
  await setupStaticFiles(app);

  app.use(logger());
  app.use(errorsMiddleware);
  app.use(etag());

  // setup routes
  registerPageRoutes(app);
  registerAuthRoutes(app);
  registerPrivateRoutes(app);

  showRoutes(app);

  // cron
  setupCron();

  // setup discord
  return app;
}

function setupCron() {
  // INFO: Mon,Wed,Thu at 8:00 AM
  Deno.cron("PodCodar: Good Morning message", "0 8 * * 1,3,4", async () => {
    const gif = await fetchRandomGif("bom dia good morning");
    await sendMessageToChannel("goodMorning", gif);

    console.log("Cron job: executed", { gif });
  });
}

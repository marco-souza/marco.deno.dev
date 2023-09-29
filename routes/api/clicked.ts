import { defineRoute } from "$fresh/server.ts";
import { logger } from "~/shared/logging.ts";

export const handler = defineRoute((_req, _ctx) => {
  logger.debug("clicked");
  return new Response("Hello from HTMX at " + new Date().toString());
});

import { defineRoute } from "$fresh/server.ts";
import { renderToString } from "preact-render-to-string";
import { logger } from "~/shared/logging.ts";

export const handler = defineRoute((_req, ctx) => {
  const element = <strong>Hello from HTMX {new Date().toString()}</strong>;

  logger.debug("click");

  return new Response(renderToString(element, ctx));
});

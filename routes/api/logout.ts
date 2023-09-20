import { Handler } from "$fresh/server.ts";
import { logger } from "~/shared/logging.ts";

export const handler: Handler = (req) => {
  const url = new URL(req.url);
  logger.debug({ info: "logout user" });

  return new Response(null, {
    status: 302,
    headers: { location: url.origin },
  });
};

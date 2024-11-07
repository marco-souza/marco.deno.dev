// deno-lint-ignore-file
import { createMiddleware } from "hono/factory";
import { time } from "~/constants.ts";

const MAX_AGE = 365 * time.DAY;

export const cacheMiddleware = (maxAge = MAX_AGE) =>
  createMiddleware(async (ctx, next) => {
    ctx.header("Cache-Control", `public, max-age=${maxAge}`);

    await next();
  });

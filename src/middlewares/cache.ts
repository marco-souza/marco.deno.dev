// deno-lint-ignore-file
import { Context } from "hono";

export async function cacheMiddleware(ctx: Context) {
  const maxAge = 60 * 60 * 24 * 365;
  ctx.header("Cache-Control", `public, max-age=${maxAge}`);
}

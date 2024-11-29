import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_KEYS } from "~/constants.ts";

export const authMiddleware = createMiddleware(async (ctx, next) => {
  const authTokenKey = getCookie(ctx, AUTH_KEYS.authToken);
  const refreshTokenKey = getCookie(ctx, AUTH_KEYS.refreshToken);

  if (!authTokenKey || !refreshTokenKey) {
    return ctx.redirect("/login?errors=Unauthorized");
  }

  ctx.set(AUTH_KEYS.authToken, authTokenKey);
  ctx.set(AUTH_KEYS.refreshToken, refreshTokenKey);

  await next();
});

import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_KEYS } from "~/constants.ts";
import { auth } from "../../packages/auth/auth.ts";

export const authMiddleware = createMiddleware(async (ctx, next) => {
  const authTokenKey = getCookie(ctx, AUTH_KEYS.authToken);
  const refreshTokenKey = getCookie(ctx, AUTH_KEYS.refreshToken);

  if (!refreshTokenKey) {
    return ctx.redirect("/login?errors=Unauthorized");
  }

  if (!authTokenKey) {
    return ctx.redirect(auth.urls.refresh);
  }

  ctx.set(AUTH_KEYS.authToken, authTokenKey);
  ctx.set(AUTH_KEYS.refreshToken, refreshTokenKey);

  await next();
});

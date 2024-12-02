import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { AUTH_KEYS, configs } from "~/constants.ts";
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

  // TODO: check if user has completed onboarding
  const redirectToOnboarding = ctx.req.path != configs.navigation.settings;
  if (redirectToOnboarding) {
    return ctx.redirect(configs.navigation.settings);
  }

  await next();
});

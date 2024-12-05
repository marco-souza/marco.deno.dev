import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { configs } from "~/constants.ts";
import { auth } from "../../packages/auth/auth.ts";
import { github } from "~/services/github.ts";
import { db } from "~/services/db.ts";
import { ALLOWED_USERS, AUTH_KEYS } from "~/shared/auth.ts";

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

  // check if user is registered
  const githubProfile = await github.fetchAuthenticatedProfile(authTokenKey);
  const id = db.users.genSocialId("github", githubProfile.login);
  const isUserRegistered = await db.users.find(id.id);
  const isUserOnboarding = ctx.req.url.includes(configs.navigation.onboarding);

  if (!isUserRegistered && !isUserOnboarding) {
    return ctx.redirect(configs.navigation.onboarding);
  }

  await next();
});

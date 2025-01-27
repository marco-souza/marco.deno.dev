import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { configs } from "~/constants.ts";
import { github } from "~/services/github.ts";
import { db } from "~/services/db.ts";
import { ALLOWED_USERS, auth, AUTH_KEYS } from "~/shared/auth.ts";

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

  // block access to not allowed users
  const profile = await github.fetchAuthenticatedProfile(authTokenKey);
  if (!ALLOWED_USERS.includes(profile.login)) {
    console.log("User not allowed", { profile });

    const redirectUrl = new URL(auth.urls.signOut, ctx.req.url);
    redirectUrl.searchParams.set(
      "errors",
      `${profile.login} is not allowed to access this page`,
    );

    console.log("redirecting", { redirectUrl });

    return ctx.redirect(redirectUrl.toString());
  }

  ctx.set("profile", profile);

  // check if user is registered
  const id = db.users.genSocialId("github", profile.login);
  const isUserRegistered = await db.users.find(id.id);
  const isUserOnboarding = ctx.req.url.includes(configs.navigation.onboarding);

  if (!isUserRegistered && !isUserOnboarding) {
    return ctx.redirect(configs.navigation.onboarding);
  }

  await next();
});

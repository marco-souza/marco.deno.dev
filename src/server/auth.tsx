import { type Context, Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import { type AccessToken, auth } from "@m3o/auth";
import { raise } from "@m3o/errors";

import { configs } from "~/constants.ts";
import { LoginPage } from "~/components/LoginPage.tsx";
import { AUTH_KEYS } from "~/shared/auth.ts";

export function registerAuthRoutes(app: Hono) {
  const authRoutes = authRouter();
  app.route("/", authRoutes);
}

function authRouter(): Hono {
  const routes = new Hono();
  const { urls } = auth;

  routes.get("/login", (ctx) => {
    const url = new URL(ctx.req.url);
    const errors = url.searchParams.get("errors") ?? "";

    return ctx.render(<LoginPage errors={errors} />);
  });

  routes.get(urls.signIn, (ctx) => {
    const reqUrl = new URL(ctx.req.url);
    const authUrl = auth.generateAuthUrl(reqUrl.origin);

    console.log("User logged in", { authUrl });

    return ctx.redirect(authUrl);
  });

  routes.get(urls.callback, async (ctx) => {
    const reqUrl = new URL(ctx.req.url);

    const code = reqUrl.searchParams.get("code") ?? raise("Missing code");
    const state = reqUrl.searchParams.get("state") ?? raise("Missing state");

    const token = await auth.fetchAccessToken(code, state);
    setAuthCookies(ctx, token);

    console.log("User logged in", { token });

    return ctx.redirect(configs.navigation.dashboard);
  });

  routes.get(urls.signOut, (ctx) => {
    const url = new URL(ctx.req.url);
    const redirectUrl = new URL("/login", url.origin);

    deleteCookie(ctx, AUTH_KEYS.authToken);
    deleteCookie(ctx, AUTH_KEYS.refreshToken);

    const errors = url.searchParams.get("errors");
    if (errors) redirectUrl.searchParams.set("errors", errors);

    return ctx.redirect(redirectUrl.toString());
  });

  routes.get(urls.refresh, async (ctx) => {
    const refreshToken = getCookie(ctx, AUTH_KEYS.refreshToken);
    if (!refreshToken) {
      return ctx.redirect(
        auth.urls.signOut + "?errors=Invalid refresh token, please login again",
      );
    }

    try {
      const token = await auth.refreshAccessToken(refreshToken);
      setAuthCookies(ctx, token);

      console.log("User refreshed token", { token });

      return ctx.redirect(configs.navigation.dashboard);
    } catch (error) {
      console.error("Error refreshing token", { error });

      return ctx.redirect(
        auth.urls.signOut + "?errors=Invalid refresh token, please login again",
      );
    }
  });

  return routes;
}

function setAuthCookies(ctx: Context, token: AccessToken) {
  setCookie(
    ctx,
    AUTH_KEYS.authToken,
    token.access_token,
    { maxAge: token.expires_in },
  );

  setCookie(
    ctx,
    AUTH_KEYS.refreshToken,
    token.refresh_token,
    { maxAge: token.refresh_token_expires_in },
  );
}

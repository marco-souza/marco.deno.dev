import { Hono } from "hono";
import { LoginPage } from "~/components/LoginPage.tsx";

import { auth } from "@m3o/auth";
import { raise } from "@m3o/errors";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { AUTH_KEYS } from "~/constants.ts";

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
    const username = url.searchParams.get("username") ?? "";

    return ctx.render(<LoginPage username={username} errors={errors} />);
  });

  routes.get(urls.signIn, (ctx) => {
    const reqUrl = new URL(ctx.req.url);

    const username = reqUrl.searchParams.get("username");
    if (username === "error") {
      return ctx.redirect("/login?errors=Invalid username");
    }

    const authUrl = auth.generateAuthUrl(reqUrl.origin);

    console.log("User logged in", { username, authUrl });

    return ctx.redirect(authUrl);
  });

  routes.get(urls.callback, async (ctx) => {
    const reqUrl = new URL(ctx.req.url);
    const code = reqUrl.searchParams.get("code") ?? raise("Missing code");
    const state = reqUrl.searchParams.get("state") ?? raise("Missing state");

    const token = await auth.fetchAccessToken(code, state);

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

    console.log("User logged in", { token });

    return ctx.redirect("/dashboard");
  });

  routes.get(urls.signOut, (ctx) => {
    deleteCookie(ctx, AUTH_KEYS.authToken);
    deleteCookie(ctx, AUTH_KEYS.refreshToken);

    return ctx.redirect("/login");
  });

  routes.get(urls.refresh, async (ctx) => {
    const refreshToken = getCookie(ctx, AUTH_KEYS.refreshToken);
    if (!refreshToken) {
      return ctx.redirect(
        "/login?errors=Invalid refresh token, please login again",
      );
    }

    const token = await auth.refreshAccessToken(refreshToken);

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

    console.log("User refreshed token", { token });

    return ctx.redirect("/dashboard");
  });

  return routes;
}

import { Hono } from "hono";
import { LoginPage } from "~/components/LoginPage.tsx";

import * as auth from "@m3o/auth";
import { raise } from "@m3o/errors";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

export function registerAuthRoutes(app: Hono) {
  const authRoutes = authRouter();
  app.route("/", authRoutes);
}

const COOKIE_KEYS = {
  authToken: "auth_token",
  refreshToken: "refresh_token",
};

function authRouter(): Hono {
  const routes = new Hono();
  const { urls } = auth.configs;

  routes.get("/login", (ctx) => {
    const url = new URL(ctx.req.url);
    const errors = url.searchParams.get("errors") ?? "";
    const username = url.searchParams.get("username") ?? "";

    return ctx.render(<LoginPage username={username} errors={errors} />);
  });

  routes.get("/dashboard", (ctx) => {
    // TODO: create a middleware for private routes
    const authTokenKey = getCookie(ctx, COOKIE_KEYS.authToken);
    const refreshTokenKey = getCookie(ctx, COOKIE_KEYS.refreshToken);

    if (!authTokenKey || !refreshTokenKey) {
      return ctx.redirect("/login?errors=Unauthorized");
    }

    return ctx.render(
      <div>
        <h1>Dashboard</h1>
        <p>Auth Token: {authTokenKey}</p>
        <p>Refresh Token: {refreshTokenKey}</p>
      </div>,
    );
  });

  routes.get(urls.signIn, (ctx) => {
    const reqUrl = new URL(ctx.req.url);

    const username = reqUrl.searchParams.get("username");
    if (username === "error") {
      return ctx.redirect("/login?errors=Invalid username");
    }

    const authUrl = auth.generateRedirectUrl(reqUrl.origin);

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
      COOKIE_KEYS.authToken,
      token.access_token,
      { maxAge: token.expires_in },
    );

    setCookie(
      ctx,
      COOKIE_KEYS.refreshToken,
      token.refresh_token,
      { maxAge: token.refresh_token_expires_in },
    );

    console.log("User logged in", { token });

    return ctx.redirect("/dashboard");
  });

  routes.get(urls.signOut, (ctx) => {
    deleteCookie(ctx, COOKIE_KEYS.authToken);
    deleteCookie(ctx, COOKIE_KEYS.refreshToken);

    return ctx.redirect("/login");
  });

  return routes;
}

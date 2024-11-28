import { Hono } from "hono";
import { LoginPage } from "~/components/LoginPage.tsx";

import * as auth from "@m3o/auth";
import { raise } from "@m3o/errors";

export function registerAuthRoutes(app: Hono) {
  const authRoutes = authRouter();
  app.route("/", authRoutes);
}

function authRouter(): Hono {
  const routes = new Hono();
  const { urls } = auth.configs;

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

    const authUrl = auth.generateRedirectUrl(reqUrl.origin);

    console.log("User logged in", { username, authUrl });

    return ctx.redirect(authUrl);
  });

  routes.get(urls.callback, async (ctx) => {
    const reqUrl = new URL(ctx.req.url);
    const code = reqUrl.searchParams.get("code") ?? raise("Missing code");
    const state = reqUrl.searchParams.get("state") ?? raise("Missing state");

    const token = await auth.fetchAccessToken(code, state);

    // TODO: store token in cookies
    // TODO: validate auth token for private routes
    // TODO: create a middleware for private routes
    console.log("User logged in", { token });

    return ctx.redirect("/");
  });

  return routes;
}

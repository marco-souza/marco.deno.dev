import { Hono } from "hono";
import type { AuthenticatedContext } from "~/shared/auth.ts";

import * as user from "~/server/private/user.tsx";
import * as onboarding from "~/server/private/onboarding.tsx";
import * as dashboard from "~/server/private/dashboard.tsx";

import { authMiddleware } from "~/middlewares/auth.ts";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { PrivateLayout } from "~/layouts/private.tsx";

export function registerPrivateRoutes(app: Hono) {
  app.route("/", privateRouter());
}

function privateRouter() {
  const routes = new Hono<{ Variables: AuthenticatedContext }>();

  // middlewares
  routes.use(authMiddleware);

  // no layout
  onboarding.defineRoutes(routes);

  // setup layout
  routes.use(
    "/*",
    jsxRenderer(({ children, Layout }) => {
      const ctx = useRequestContext();
      const profile = ctx.get("profile");

      return (
        <Layout>
          <PrivateLayout profile={profile}>{children}</PrivateLayout>;
        </Layout>
      );
    }),
  );

  // setup inner routes
  user.defineRoutes(routes);
  dashboard.defineRoutes(routes);

  return routes;
}

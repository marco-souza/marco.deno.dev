import { Hono } from "hono";
import type { AuthenticatedContext } from "~/shared/auth.ts";

import * as user from "~/server/private/user.tsx";
import * as onboarding from "~/server/private/onboarding.tsx";

export function registerPrivateRoutes(app: Hono) {
  app.route("/", privateRouter());
}

function privateRouter() {
  const routes = new Hono<{ Variables: AuthenticatedContext }>();

  // setup routes
  user.defineRoutes(routes);
  onboarding.defineRoutes(routes);

  return routes;
}

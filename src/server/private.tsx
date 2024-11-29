import { Hono } from "hono";
import { authMiddleware } from "~/middlewares/auth.ts";
import { AUTH_KEYS, type AuthenticatedContext } from "~/constants.ts";

export function registerPrivateRoutes(app: Hono) {
  app.route("/", privateRouter());
}

function privateRouter() {
  const routes = new Hono<{ Variables: AuthenticatedContext }>();

  routes.use(authMiddleware);

  routes.get("/dashboard", (ctx) => {
    const authTokenKey = ctx.get(AUTH_KEYS.authToken);
    const refreshTokenKey = ctx.get(AUTH_KEYS.refreshToken);

    return ctx.render(
      <div>
        <h1>Dashboard</h1>
        <p>Auth Token: {authTokenKey}</p>
        <p>Refresh Token: {refreshTokenKey}</p>
      </div>,
    );
  });

  return routes;
}

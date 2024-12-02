import { Hono } from "hono";
import { authMiddleware } from "~/middlewares/auth.ts";
import { AUTH_KEYS, type AuthenticatedContext, configs } from "~/constants.ts";
import { auth } from "@m3o/auth";
import { github } from "~/services/github.ts";

export function registerPrivateRoutes(app: Hono) {
  app.route("/", privateRouter());
}

function privateRouter() {
  const routes = new Hono<{ Variables: AuthenticatedContext }>();

  routes.use(authMiddleware);

  routes.get(configs.navigation.dashboard, (ctx) => {
    const authTokenKey = ctx.get(AUTH_KEYS.authToken);
    const refreshTokenKey = ctx.get(AUTH_KEYS.refreshToken);

    return ctx.render(
      <div>
        <h1>Dashboard</h1>
        <p>Auth Token: {authTokenKey}</p>
        <p>Refresh Token: {refreshTokenKey}</p>

        <a href={auth.urls.signOut} class="btn btn-secondary">
          Logout
        </a>
      </div>,
    );
  });

  routes.get(configs.navigation.settings, async (ctx) => {
    const authTokenKey = ctx.get(AUTH_KEYS.authToken);
    const profile = await github.fetchAuthenticatedProfile(authTokenKey);

    return ctx.render(
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
        <aside class="col-span-1 flex flex-col gap-4">
          <h1 class="text-4xl">Settings</h1>

          <nav class="flex flex-col gap-4">
            <a href="/user/settings" class="link link-primary">
              User
            </a>
          </nav>
        </aside>

        <main class="col-span-3 p-4">
          <form hx-post="/user/settings" class="grid gap-4">
            <img
              alt="It's Me"
              src={profile.avatar_url}
              class="h-40 mx-auto rounded-full"
            />

            <div class="form-group grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="input input-bordered w-full"
                  id="name"
                  value={profile.name}
                />
              </div>

              <div class="form-group">
                <label for="login">Username</label>
                <input
                  disabled
                  id="login"
                  type="text"
                  class="input input-bordered w-full"
                  value={profile.login}
                />
              </div>
            </div>

            <div class="form-group">
              <label for="bio">Bio</label>

              <textarea
                id="bio"
                rows={3}
                class="textarea textarea-bordered w-full"
                dangerouslySetInnerHTML={{ __html: profile.bio }}
              />
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
          </form>
        </main>
      </div>,
    );
  });

  return routes;
}

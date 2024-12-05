import { Hono } from "hono";
import { authMiddleware } from "~/middlewares/auth.ts";
import { AUTH_KEYS, type AuthenticatedContext, configs } from "~/constants.ts";
import { raise } from "@m3o/errors";
import { github } from "~/services/github.ts";
import { AuthenticatedUserProfile } from "~/components/AuthenticatedUserProfile.tsx";
import { db } from "~/services/db.ts";

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

  routes.get(configs.navigation.onboarding, async (ctx) => {
    const authTokenKey = ctx.get(AUTH_KEYS.authToken);
    const profile = await github.fetchAuthenticatedProfile(authTokenKey);

    // TODO: register user in the database

    return ctx.render(
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
        <aside class="md:col-span-1 flex flex-col gap-4">
          <h1 class="text-4xl">Onboarding</h1>

          <h2 class="text-2xl">Welcome, {profile.name}! 🎉</h2>

          <p class="font-light">
            Please fill in the form below to complete your registration.
          </p>
        </aside>

        <main class="md:col-span-3 p-4 flex gap-4">
          <AuthenticatedUserProfile profile={profile} />

          <div className="card flex flex-col gap-4">
            <h2 class="card-title">
              Create your first vault 🏰
            </h2>

            <p class="font-light italic">
              You can use this vault to store your notes, pages, ideas, and
              snippets, and more
            </p>

            <div class="card-actions justify-center">
              <form
                hx-target="body"
                hx-post={configs.navigation.onboarding}
                class="w-full grid gap-4"
              >
                <div class="form-group">
                  <label for="vault-name">Vault Name</label>
                  <input
                    type="text"
                    name="name"
                    value="My vault"
                    class="input input-bordered w-full"
                    placeholder="Enter your vault name"
                    id="vault-name"
                    autofocus
                    required
                  />
                </div>

                <input
                  id="owner"
                  type="hidden"
                  name="owner"
                  value={profile.login}
                />

                <button type="submit" class="btn btn-primary w-full">
                  + Add Vault
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>,
    );
  });

  routes.post(configs.navigation.onboarding, async (ctx) => {
    const authTokenKey = ctx.get(AUTH_KEYS.authToken);
    const profile = await github.fetchAuthenticatedProfile(authTokenKey);

    // create user
    const { id } = db.users.genSocialId("github", profile.login);
    const user = await db.users.create({
      id,
      name: profile.name,
      username: profile.login,
      email: profile.email,
      avatar: profile.avatar_url,
      role: "user",
    });

    console.log("user created", { user });

    // TODO: create vault
    const formData = await ctx.req.formData();
    const name = formData.get("name")?.toString() ??
      raise("Vault name is required");

    const vault = {
      name: name,
      owner: profile.login, // NOTE: we can only use this because we are not using multiple social auths
      notes: {},
    };

    console.log("create vault", { vault });

    return ctx.redirect(configs.navigation.dashboard + `?welcome=true`);
  });

  return routes;
}

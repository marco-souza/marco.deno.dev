import { Hono } from "hono";
import { authMiddleware } from "~/middlewares/auth.ts";
import { AUTH_KEYS, type AuthenticatedContext, configs } from "~/constants.ts";
import { auth } from "@m3o/auth";
import { github, type GitHubProfile } from "~/services/github.ts";
import { parseBioText } from "~/components/GitHubProfile.tsx";

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
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-8">
        <aside class="col-span-1 flex flex-col gap-4">
          <h1 class="text-4xl">Onboarding</h1>

          <h2 class="text-2xl">Welcome, {profile.name}! 🎉</h2>

          <p class="font-light">
            Please fill in the form below to complete your registration.
          </p>
        </aside>

        <main class="col-span-3 p-4 flex gap-4">
          <UserRegistrationCard profile={profile} />
        </main>
      </div>,
    );
  });

  return routes;
}

function UserRegistrationCard({ profile }: { profile: GitHubProfile }) {
  return (
    <div class="card bg-base-100 shadow-xl w-96">
      <figure>
        <img src={profile.avatar_url} alt="It's me" />
      </figure>

      <div class="card-body grid gap-4">
        <h2 class="card-title">
          {profile.name}
          <span class="text-xs text-left text-gray-200 badge badge-primary">
            @{profile.login}
          </span>
        </h2>

        <p class="text-xs font-light">{profile.email}</p>

        <p
          class="font-light"
          dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
        />

        <div class="card-actions justify-center">
          <form hx-post="/user/settings w-full">
            <button type="submit" class="btn btn-primary w-full">
              Register User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

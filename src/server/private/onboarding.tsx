import type { Hono } from "hono";
import { configs } from "~/constants.ts";
import { raise } from "#/packages/errors/main.ts";
import { github } from "~/services/github.ts";
import { AuthenticatedUserProfile } from "~/components/AuthenticatedUserProfile.tsx";
import { AUTH_KEYS, type AuthenticatedContext } from "~/shared/auth.ts";
import { users } from "~/repositories/users.ts";
import { vaults } from "~/repositories/vaults.ts";

export function defineRoutes(
  routes: Hono<{ Variables: AuthenticatedContext }>,
) {
  routes.get(configs.navigation.onboarding, (ctx) => {
    const profile = ctx.get("profile");

    console.log("new user", { profile });

    return ctx.render(
      <div class="grid gap-4 lg:grid-cols-4 md:gap-8">
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
    const user = await users.insertOne({
      name: profile.name,
      username: profile.login,
      email: profile.email,
      avatar: profile.avatar_url,
      role: "user",
    });

    console.log("user created", { user });

    const formData = await ctx.req.formData();
    const name = formData.get("name")?.toString() ??
      raise("Vault name is required");

    const vault = await vaults.insertOne({
      name: name,
      owner: profile.login, // NOTE: we can only use this because we are not using multiple social auths
      notes: {
        "welcome-note": [
          {
            content: "Welcome to your new vault!",
            last_modified: new Date().toISOString(),
          },
        ],
      },
    });

    console.log("create vault", { vault });

    return ctx.redirect(configs.navigation.dashboard + `?welcome=true`);
  });

  return routes;
}

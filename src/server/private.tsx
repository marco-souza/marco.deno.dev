import { Hono } from "hono";
import { authMiddleware } from "~/middlewares/auth.ts";
import { configs } from "~/constants.ts";
import { raise } from "@m3o/errors";
import { github } from "~/services/github.ts";
import { AuthenticatedUserProfile } from "~/components/AuthenticatedUserProfile.tsx";
import { db } from "~/services/db.ts";
import { AUTH_KEYS, type AuthenticatedContext } from "~/shared/auth.ts";

export function registerPrivateRoutes(app: Hono) {
  app.route("/", privateRouter());
}

function privateRouter() {
  const routes = new Hono<{ Variables: AuthenticatedContext }>();

  routes.use(authMiddleware);

  // TODO: split routes into separate files

  routes.get(configs.navigation.dashboard, async (ctx) => {
    const profile = ctx.get("profile");
    const vaults = await db.vaults.findAllByOwner(profile.login);

    return ctx.render(
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
        <aside class="col-span-1 flex flex-col gap-4">
          <h1 class="text-4xl">Hi, {profile.name} 👋</h1>

          <p class="font-light">
            Here you can manage your account and settings
          </p>

          <nav class="flex flex-col gap-4">
            <a href="/dashboard" class="link link-primary">
              Dashboard
            </a>

            <a href="/user/settings" class="link link-primary">
              Settings
            </a>
          </nav>
        </aside>

        <main class="col-span-3 p-4 gap-4 grid">
          <div className="header flex flex-col gap-2">
            <h2 class="text-2xl">Your Vaults</h2>

            <p class="font-light text-sm italic">
              Select a vault to get started.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
            {vaults.map((vault) => (
              <div
                class="card card-bordered shadown-md hover:shadow-zinc-200"
                key={vault.name}
              >
                <div class="card-body gap-2">
                  <h3 class="card-title text-xl">{vault.name}</h3>

                  <p class="font-light text-sm">
                    Notes: {Object.keys(vault.notes).length}
                  </p>

                  <div class="card-actions">
                    <a href={`/vault/${vault.owner}/${vault.name}`}>
                      Open Vault
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>,
    );
  });

  routes.get(configs.navigation.settings, (ctx) => {
    const profile = ctx.get("profile");

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

  routes.get(configs.navigation.onboarding, (ctx) => {
    const profile = ctx.get("profile");

    console.log("new user", { profile });

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

    const formData = await ctx.req.formData();
    const name = formData.get("name")?.toString() ??
      raise("Vault name is required");

    const vault = await db.vaults.create({
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

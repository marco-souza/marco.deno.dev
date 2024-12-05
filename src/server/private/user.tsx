import type { Hono } from "hono";
import * as constantsTs from "~/constants.ts";
import type { AuthenticatedContext } from "~/shared/auth.ts";

export function defineRoutes(
  routes: Hono<{ Variables: AuthenticatedContext }>,
) {
  routes.get(constantsTs.configs.navigation.settings, (ctx) => {
    const profile = ctx.get("profile");

    return ctx.render(
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
      </main>,
    );
  });

  return routes;
}

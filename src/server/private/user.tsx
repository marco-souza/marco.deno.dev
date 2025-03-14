import type { Hono } from "hono";
import * as constantsTs from "~/constants.ts";
import type { AuthenticatedContext } from "~/shared/auth.ts";
import { auth } from "~/shared/auth.ts";
import { users } from "~/repositories/users.ts";
import { z } from "zod";

export function defineRoutes(
  routes: Hono<{ Variables: AuthenticatedContext }>,
) {
  routes.get(constantsTs.configs.navigation.settings, (ctx) => {
    const profile = ctx.get("profile");

    return ctx.render(
      <main class="col-span-3 p-4 grid gap-4">
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

        <button
          type="submit"
          class="btn btn-outline w-full btn-error"
          hx-delete="/user"
        >
          Delete Account
        </button>
      </main>,
    );
  });

  routes.delete("/user", async (ctx) => {
    const profile = ctx.get("profile");

    const username = z.string()
      .min(3)
      .max(30)
      .parse(profile.login);

    await users.deleteOne({ username });

    // htmx redirect
    ctx.header("hx-redirect", auth.urls.signOut);

    return ctx.body(null);
  });

  return routes;
}

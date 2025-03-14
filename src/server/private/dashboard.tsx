import type { Hono } from "hono";
import { configs } from "~/constants.ts";
import type { AuthenticatedContext } from "~/shared/auth.ts";
import { vaults } from "~/repositories/vaults.ts";

export function defineRoutes(
  routes: Hono<{ Variables: AuthenticatedContext }>,
) {
  routes.get(configs.navigation.dashboard, async (ctx) => {
    const profile = ctx.get("profile");
    const userVaults = await vaults.find({ owner: profile.login });
    const vaultsArray = await userVaults.toArray();

    if (!vaultsArray.length) {
      return ctx.render(<p>Add a new vault</p>);
    }

    return ctx.render(
      <>
        <div className="header flex flex-col gap-2">
          <h2 class="text-2xl">Your Vaults</h2>

          <p class="font-light text-sm italic">
            Select a vault to get started.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 md:gap-8">
          {vaultsArray.map((vault) => (
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
      </>,
    );
  });

  return routes;
}

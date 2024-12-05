import type { PropsWithChildren } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { GitHubAuthenticatedProfile } from "~/services/github.ts";
import { defineMenuLinks } from "~/shared/links.tsx";

type Props = PropsWithChildren<{
  profile: GitHubAuthenticatedProfile;
}>;

export const PrivateLayout: FC<Props> = ({ profile, children }) => {
  const menuLinks = defineMenuLinks(
    { href: "/dashboard", name: "Dashboard" },
    { href: "/user/settings", name: "Settings" },
    { href: "/api/auth/logout", name: "Sign out" },
  );

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8">
      <aside class="col-span-1 flex flex-col gap-4">
        <h1 class="text-4xl">Hi, {profile.name} 👋</h1>

        <p class="font-light">
          Here you can manage your account and settings
        </p>

        <nav class="flex flex-col gap-4">
          {menuLinks.map((link) => (
            <a href={link.href} class="link link-primary">
              {link.name}
            </a>
          ))}
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
          {children}
        </div>
      </main>
    </div>
  );
};

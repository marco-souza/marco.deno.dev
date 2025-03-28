import GithubIcon from "~/components/icons/GitHubIcon.tsx";
import { configs } from "~/constants.ts";
import { Logo } from "~/components/Logo.tsx";
import { ThemeSwitcher } from "~/components/ThemeSwitcher.tsx";
import type { Theme } from "~/shared/theme.ts";
import { defineMenuLinks } from "~/shared/links.tsx";

export type NavBarProps = {
  theme: Theme;
  isAuthenticated: boolean;
};

export const NavBar = ({ theme, isAuthenticated }: NavBarProps) => (
  <div class="navbar skip-printer">
    <div class="navbar-start">
      <Menu isAuthenticated={isAuthenticated} />
    </div>

    <div class="navbar-center">
      <Logo />
    </div>

    <div class="navbar-end">
      <ThemeSwitcher theme={theme} />

      <a
        href={configs.repo}
        target="_black"
        class="btn btn-ghost btn-circle"
      >
        <GithubIcon />
      </a>
    </div>
  </div>
);

const Menu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const menuLinks = defineMenuLinks(
    { href: "/", name: "Home" },
    { href: "/blog", name: "Blog" },
    { href: "/resume", name: "Resume" },
    // public
    { href: "/login", name: "Sign in", hide: isAuthenticated },
    // private
    { href: "/dashboard", name: "Dashboard", hide: !isAuthenticated },
    { href: "/api/auth/logout", name: "Sign out", hide: !isAuthenticated },
  );

  return (
    <div class="dropdown" role="button" as="button">
      <label tabIndex={0} class="btn btn-ghost btn-circle">
        <MenuIcon />
      </label>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {menuLinks.map((link) => (
          <li>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}

        <button
          type="button"
          className="btn btn-ghost"
          onclick='() => registerServiceWorker("/sw.js")'
        >
          Enable notifications
        </button>
      </ul>
    </div>
  );
};

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);

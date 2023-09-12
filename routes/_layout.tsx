import { defineLayout } from "$fresh/server.ts";
import ThemeSwitcher from "#/islands/ThemeSwitcher.tsx";
import { Logo } from "~/components/Logo.tsx";
import GithubIcon from "~/icon/GitHubIcon.tsx";
import { site } from "~/settings.ts";

export default defineLayout((_req, ctx) => {
  return (
    <div class="grid gap-24 container mx-auto">
      <NavBar />

      <ctx.Component />
    </div>
  );
});

const NavBar = () => (
  <div class="navbar">
    <div class="navbar-start">
      <ExpandableMenu />
    </div>

    <div class="navbar-center">
      <Logo />
    </div>

    <div class="navbar-end">
      <ThemeSwitcher />

      <a href={site.repository} target="_black" class="btn btn-ghost btn-circle">
        <GithubIcon />
      </a>
    </div>
  </div>
);

const ExpandableMenu = () => (
  <div class="dropdown" role="button" as="button">
    <label tabIndex={0} class="btn btn-ghost btn-circle">
      <MenuIcon />
    </label>
    <ul
      tabIndex={0}
      class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <a>Homepage</a>
      </li>
      <li>
        <a>Portfolio</a>
      </li>
      <li>
        <a>About</a>
      </li>
    </ul>
  </div>
);

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

import { defineLayout } from "$fresh/server.ts";
import ThemeSwitcher from "#/islands/ThemeSwitcher.tsx";
import { Logo } from "~/components/Logo.tsx";

export default defineLayout((_req, ctx) => {
  return (
    <div class="grid gap-24 container mx-auto">
      <NavBar />

      <ctx.Component />
    </div>
  );
});

const NavBar = () => (
  <div class="navbar bg-base-100 md:space-between">
    <div class="flex-none">
      <ExpandableMenu />
    </div>

    <div class="flex-1 flex justify-center">
      <Logo />
    </div>

    <div class="flex-none">
      <ThemeSwitcher />
    </div>
  </div>
);

const ExpandableMenu = () => (
  <ul class="menu menu-horizontal px-1">
    <li>
      <details>
        <summary>
          <MenuIcon />
        </summary>

        <ul class="p-2 bg-base-100 w-36">
          <li>
            <a>Link 1</a>
          </li>
          <li>
            <a>Link 2</a>
          </li>
        </ul>
      </details>
    </li>
  </ul>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="inline-block w-5 h-5 stroke-current"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16"
    >
    </path>
  </svg>
);

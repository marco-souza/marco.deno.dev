import { defineLayout } from "$fresh/server.ts";
import ThemeSwitcher from "#/islands/ThemeSwitcher.tsx";
import { Logo } from "~/components/Logo.tsx";
import GithubIcon from "~/icon/GitHubIcon.tsx";
import { site } from "~/settings.ts";

export default defineLayout((_req, ctx) => {
  return (
    <div class="grid gap-24 container mx-auto">
      <NavBar />

      <div class="px-8">
        <ctx.Component />
      </div>

      <Footer />
    </div>
  );
});

export const Footer = () => {
  return (
    <footer class="py-10">
      <p class="text-center text-white text-sm">Made with ☕️ + 🍋 + ❤️</p>
    </footer>
  );
};

const NavBar = () => (
  <div class="navbar">
    <div class="navbar-start">
      <Menu />
    </div>

    <div class="navbar-center">
      <Logo />
    </div>

    <div class="navbar-end">
      <ThemeSwitcher />

      <a
        href={site.repository}
        target="_black"
        class="btn btn-ghost btn-circle"
      >
        <GithubIcon />
      </a>
    </div>
  </div>
);

const menuLinks = [
  { href: "/", name: "Home" },
  { href: "/resume", name: "Resume" },
  { href: "/blog", name: "Blog" },
];

const Menu = () => (
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

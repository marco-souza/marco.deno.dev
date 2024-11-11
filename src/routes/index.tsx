import type { Context, Hono } from "hono";
import type { FC } from "hono/jsx";
import type { Theme } from "~/shared/theme.ts";
import { getCookie, setCookie } from "hono/cookie";
import { Layout } from "~/layouts/main.tsx";

const Page: FC = ({ theme }) => {
  function toggleTheme() {
    const htmlElement = document.documentElement;

    let selectedTheme = htmlElement.dataset.theme;
    if (selectedTheme === "system") {
      selectedTheme =
        globalThis.matchMedia("(prefers-color-scheme: dark)")?.matches
          ? "dark"
          : "light";
    }

    const newTheme = selectedTheme === "dark" ? "light" : "dark";

    htmlElement.dataset.theme = newTheme;
    document.cookie = `selected-theme=${newTheme}`;
  }

  return (
    <>
      <h1>Hello Hono!</h1>

      <h2>Selected theme: {theme}</h2>

      <button
        id="toggle-theme"
        class="btn btn-primary"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>
    </>
  );
};

const COOKIE_THEME = "selected-theme";

export function definePage(app: Hono) {
  app.get("/", (ctx: Context) => {
    const theme = setThemeCookie(ctx);
    return ctx.render(
      <Layout theme={theme} title="Hello World 🌎">
        <Page />
      </Layout>,
    );
  });

  app.post("/toggle-theme", (ctx: Context) => {
    const theme = setThemeCookie(ctx);
    return ctx.text("Them Switched to: " + theme);
  });
}

function setThemeCookie(ctx: Context) {
  const themeCookie = getCookie(ctx, COOKIE_THEME);

  let theme: Theme = "system";
  if (themeCookie) {
    theme = themeCookie as Theme;
  }

  setCookie(ctx, COOKIE_THEME, theme);

  return theme;
}

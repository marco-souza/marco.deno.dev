import type { Context, Hono } from "hono";
import type { FC } from "hono/jsx";
import type { PropsWithChildren } from "hono/jsx";
import { getCookie, setCookie } from "hono/cookie";

type Theme = "system" | "light" | "dark";

const Layout: FC<PropsWithChildren<{ theme: Theme }>> = (props) => {
  return (
    <html data-theme={props.theme}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script src="/static/js/htmx.min.js"></script>

        <title>Hello Hono!</title>

        <link rel="stylesheet" href="/static/css/styles.min.css" />
      </head>

      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{
  theme: Theme;
}> = ({ theme }) => {
  function toggleTheme() {
    const appliedTheme =
      globalThis.matchMedia("(prefers-color-scheme: light)")?.matches
        ? "light"
        : "dark";

    console.log(appliedTheme);

    const htmlElement = document.documentElement;
    const selectedTheme = htmlElement.dataset.theme ?? appliedTheme;
    const newTheme = selectedTheme === "dark" ? "light" : "dark";

    htmlElement.dataset.theme = newTheme;
    document.cookie = `selected-theme=${newTheme}`;
  }

  return (
    <Layout theme={theme}>
      <h1>Hello Hono!</h1>

      <h1>Selected theme: {theme}</h1>

      <button
        id="toggle-theme"
        // theme is not switching
        class="btn btn-primary"
        hx-post="/toggle-theme"
        hx-trigger="click"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>

      <button
        hx-post="/clicked"
        hx-trigger="click"
        hx-swap="outerHTML"
        class="btn btn-outlined"
      >
        Click Me!
      </button>
    </Layout>
  );
};

const COOKIE_THEME = "selected-theme";

export function definePage(app: Hono) {
  app.get("/", (ctx: Context) => {
    const theme = setThemeCookie(ctx);
    return ctx.render(<Top theme={theme} />);
  });

  app.post("/clicked", (ctx: Context) => {
    const now = Date.now();
    console.log("POST /clicked", now);
    return ctx.render(
      <p class="rounded-full p-4 bg-red-800">Clicked now: {now}</p>,
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

import type { Context, Hono } from "hono";
import type { FC } from "hono/jsx";
import { Layout } from "~/layouts/main.tsx";
import { ThemeSwitcher } from "~/components/ThemeSwitcher.tsx";
import { COOKIE_THEME } from "~/shared/theme.ts";

const Page: FC = ({ theme }) => {
  return (
    <>
      <h1>Hello Hono!</h1>

      <h2>Selected theme: {theme}</h2>

      <ThemeSwitcher />
    </>
  );
};

export function definePage(app: Hono) {
  app.get("/", (ctx: Context) => {
    const theme = ctx.get(COOKIE_THEME);
    return ctx.render(
      <Layout theme={theme} title="Hello World 🌎">
        <Page />
      </Layout>,
    );
  });

  app.post("/toggle-theme", (ctx: Context) => {
    const theme = ctx.get(COOKIE_THEME);
    return ctx.text("Them Switched to: " + theme);
  });
}

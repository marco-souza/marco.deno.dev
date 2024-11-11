import type { Context, Hono } from "hono";
import type { FC } from "hono/jsx";
import { Layout } from "~/layouts/main.tsx";
import { COOKIE_THEME } from "~/shared/theme.ts";

const Page: FC = () => {
  return (
    <>
      <h1>Hello from Hono! 👋</h1>
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
}

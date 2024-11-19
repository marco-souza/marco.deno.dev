import { type Context, Hono } from "hono";
import { jsxMiddleware } from "~/middlewares/jsx.ts";
import { themeMiddleware } from "~/middlewares/theme.ts";
import ErrorPage from "~/components/ErrorPage.tsx";
import { GitHubProfileView } from "~/components/GitHubProfile.tsx";
import { Layout } from "~/layouts/main.tsx";
import { github } from "~/services/github.ts";
import { getThemeCookie } from "~/shared/theme.ts";

import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

export function registerPageRoutes(app: Hono) {
  const pages = new Hono();

  pages.use("/*", jsxMiddleware); // enhanced jsx
  pages.use("/*", themeMiddleware); // handle theme

  // setup layout
  pages.use(
    "/*",
    jsxRenderer(({ children }) => {
      const ctx = useRequestContext();
      const theme = getThemeCookie(ctx);
      return (
        <Layout theme={theme} title="Hello World 🌎">
          {children}
        </Layout>
      );
    }),
  );

  // setup pages
  pages.get("/", async (ctx: Context) => {
    const profile = await github.fetchProfile();
    return ctx.render(
      <GitHubProfileView profile={profile} />,
    );
  });

  // setup main router
  app.route("/", pages);

  app.notFound((ctx) => {
    return ctx.render(
      <ErrorPage description="Could not find your page :(" />,
    );
  });
}

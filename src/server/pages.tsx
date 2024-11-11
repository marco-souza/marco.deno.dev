import type { Context, Hono } from "hono";
import { jsxMiddleware } from "~/middlewares/jsx.ts";
import { themeMiddleware } from "~/middlewares/theme.ts";
import ErrorPage from "~/components/ErrorPage.tsx";
import { GitHubProfileView } from "~/components/GitHubProfile.tsx";
import { Layout } from "~/layouts/main.tsx";
import { github } from "~/services/github.ts";
import { getThemeCookie } from "~/shared/theme.ts";

export function registerPageRoutes(app: Hono) {
  app.use("/*", jsxMiddleware); // enhanced jsx
  app.use("/*", themeMiddleware); // handle theme

  app.notFound((ctx) => {
    const theme = getThemeCookie(ctx);
    return ctx.render(
      <Layout theme={theme} title="Hello World 🌎">
        <ErrorPage description="Could not find your page :(" />,
      </Layout>,
    );
  });

  app.get("/", async (ctx: Context) => {
    const theme = getThemeCookie(ctx);
    const profile = await github.fetchProfile();
    return ctx.render(
      <Layout theme={theme} title="Hello World 🌎">
        <GitHubProfileView profile={profile} />,
      </Layout>,
    );
  });
}

import type { Context, Hono } from "hono";
import { Layout } from "~/layouts/main.tsx";
import { COOKIE_THEME } from "~/shared/theme.ts";
import { GitHubProfileView } from "~/components/GitHubProfile.tsx";
import { github } from "~/services/github.ts";

export function definePage(app: Hono) {
  app.get("/", async (ctx: Context) => {
    const theme = ctx.get(COOKIE_THEME);
    const profile = await github.fetchProfile();
    return ctx.render(
      <Layout theme={theme} title="Hello World 🌎">
        <GitHubProfileView profile={profile} />,
      </Layout>,
    );
  });
}

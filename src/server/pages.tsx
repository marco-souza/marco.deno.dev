import { type Context, Hono } from "hono";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

import { jsxMiddleware } from "~/middlewares/jsx.ts";
import { themeMiddleware } from "~/middlewares/theme.ts";

import { blog } from "~/services/blog.ts";
import { github } from "~/services/github.ts";
import { getThemeCookie } from "~/shared/theme.ts";

import { Layout } from "~/layouts/main.tsx";
import { GitHubProfileView } from "~/components/GitHubProfile.tsx";

import ErrorPage from "~/components/ErrorPage.tsx";
import { ResumePage } from "~/components/ResumePage.tsx";
import { BlogPage } from "~/components/BlogPage.tsx";
import { BlogPostPage } from "~/components/BlogPostPage.tsx";
import { getCookie } from "hono/cookie";
import { AUTH_KEYS } from "~/shared/auth.ts";

export function registerPageRoutes(app: Hono) {
  const partials = partialRouter();
  app.route("/partials", partials);

  const pages = pageRouter();
  app.route("/", pages);

  app.notFound((ctx) => {
    return ctx.render(
      <ErrorPage description="Could not find your page :(" />,
    );
  });
}

function pageRouter(): Hono {
  const pages = new Hono();

  pages.use("/*", jsxMiddleware); // enhanced jsx
  pages.use("/*", themeMiddleware); // handle theme

  // setup layout
  pages.use(
    "/*",
    jsxRenderer(({ children }) => {
      const ctx = useRequestContext();
      const theme = getThemeCookie(ctx);
      const isAuthenticated = Boolean(
        getCookie(ctx, AUTH_KEYS.authToken) ||
          getCookie(ctx, AUTH_KEYS.refreshToken),
      );

      return (
        <Layout
          theme={theme}
          title="Hello World 🌎"
          navbar={{ theme, isAuthenticated }}
        >
          {children}
        </Layout>
      );
    }),
  );

  pages.get("/", async (ctx: Context) => {
    const profile = await github.fetchProfile();
    return ctx.render(
      <GitHubProfileView profile={profile} />,
    );
  });

  // blog
  pages.get("/blog", async (ctx: Context) => {
    const posts = await blog.listPosts();
    return ctx.render(
      <BlogPage posts={posts} />,
    );
  });

  // blog post
  pages.get("/blog/:slug", async (ctx: Context) => {
    const { slug } = ctx.req.param();
    const content = await blog.loadPost(slug);

    return ctx.render(
      <BlogPostPage {...content} />,
    );
  });

  pages.get("/resume", async (ctx: Context) => {
    const profile = await github.fetchProfile();
    return ctx.render(
      <ResumePage profile={profile} />,
    );
  });

  return pages;
}

function partialRouter(): Hono {
  const partials = new Hono();

  partials.get("resume", async (ctx) => {
    const content = await github.fetchResume();

    return ctx.render(
      <div class="markdown-body card shadow-md full-printer-page w-full">
        <div class="card-body" dangerouslySetInnerHTML={{ __html: content }} />
      </div>,
    );
  });

  return partials;
}

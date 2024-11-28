import { type Context, Hono } from "hono";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";

import { jsxMiddleware } from "~/middlewares/jsx.ts";
import { themeMiddleware } from "~/middlewares/theme.ts";
import ErrorPage from "~/components/ErrorPage.tsx";
import { GitHubProfileView } from "~/components/GitHubProfile.tsx";
import { Layout } from "~/layouts/main.tsx";
import { github } from "~/services/github.ts";
import { getThemeCookie } from "~/shared/theme.ts";

import { ResumePage } from "~/components/ResumePage.tsx";
import { BlogPage } from "~/components/BlogPage.tsx";
import { BlogPostPage } from "~/components/BlogPostPage.tsx";
import { blog } from "~/services/blog.ts";

import * as auth from "@m3o/auth";
import { raise } from "@m3o/errors";

export function registerPageRoutes(app: Hono) {
  const partials = partialRouter();
  app.route("/partials", partials);

  const pages = pageRouter();
  app.route("/", pages);

  const authRoutes = authRouter();
  app.route("/", authRoutes);

  app.notFound((ctx) => {
    return ctx.render(
      <ErrorPage description="Could not find your page :(" />,
    );
  });
}

function authRouter(): Hono {
  const routes = new Hono();
  const { urls } = auth.configs;

  routes.get("/login", (ctx) => {
    const url = new URL(ctx.req.url);
    const errors = url.searchParams.get("errors");
    const username = url.searchParams.get("username") ?? "";

    return ctx.render(
      <div class="card shadow-md">
        <div class="card-body">
          <h1 class="text-2xl">Login</h1>

          <form class="flex gap-4" action={urls.signIn} hx-boost="false">
            <input
              type="text"
              name="username"
              value={username}
              class="input input-bordered flex-1"
              placeholder="Enter your username"
              autofocus
              required
            />
            <button class="btn btn-primary" type="submit">Login</button>
          </form>

          {errors && <p class="text-red-500">{errors}</p>}
        </div>
      </div>,
    );
  });

  routes.get(urls.signIn, (ctx) => {
    const reqUrl = new URL(ctx.req.url);

    const username = reqUrl.searchParams.get("username");
    if (username === "error") {
      return ctx.redirect("/login?errors=Invalid username");
    }

    const authUrl = auth.generateRedirectUrl(reqUrl.origin);

    console.log("User logged in", { username, authUrl });

    return ctx.redirect(authUrl);
  });

  routes.get(urls.callback, async (ctx) => {
    const reqUrl = new URL(ctx.req.url);
    const code = reqUrl.searchParams.get("code") ?? raise("Missing code");
    const state = reqUrl.searchParams.get("state") ?? raise("Missing state");

    const token = await auth.fetchAccessToken(code, state);

    console.log("User logged in", { token });

    return ctx.redirect("/");
  });

  return routes;
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
      return (
        <Layout theme={theme} title="Hello World 🌎">
          {children}
        </Layout>
      );
    }),
  );

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

  pages.get("/", async (ctx: Context) => {
    const profile = await github.fetchProfile();
    return ctx.render(
      <GitHubProfileView profile={profile} />,
    );
  });

  return pages;
}

function partialRouter(): Hono {
  const partials = new Hono();

  partials.get("resume", async (ctx) => {
    const content = await github.fetchResume();

    return ctx.render(
      <div class="markdown-body card shadow-md">
        <div class="card-body" dangerouslySetInnerHTML={{ __html: content }} />
      </div>,
    );
  });

  return partials;
}

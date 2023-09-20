import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";
import { defineRoute } from "$fresh/src/server/defines.ts";
import { blog } from "~/services/blog.ts";

export default defineRoute(async (_req, ctx) => {
  const slug = ctx.params.slug ?? ""
  const post = await blog.readPost(slug).catch(() => null)
  if (!post) return ctx.renderNotFound()

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="grid gap-8">
        <div>
          <a href="/blog" class="hover:underline">← Blog</a>
        </div>
        <div
          class="markdown-body"
          style={{ background: "transparent" }}
          data-color-mode="auto"
          data-dark-theme="dark"
          data-light-theme="light"
          dangerouslySetInnerHTML={{ __html: render(post.body) }}
        />
      </main>
    </>
  );
})


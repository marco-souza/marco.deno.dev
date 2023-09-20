import { Handlers, PageProps } from "$fresh/server.ts";
import { extract } from "$std/front_matter/yaml.ts";
import { CSS, render } from "$gfm";
import { Head } from "$fresh/runtime.ts";

interface Page {
  markdown: string;
  data: Record<string, unknown>;
}

export const handler: Handlers<Page> = {
  async GET(_req, ctx) {
    let rawMarkdown = "";
    if (ctx.params.slug === "remote") {
      const resp = await fetch(
        `https://raw.githubusercontent.com/denoland/fresh/main/docs/latest/introduction/index.md`,
      );
      if (resp.status !== 200) {
        return ctx.render(undefined);
      }
      rawMarkdown = await resp.text();
    } else if (ctx.params.slug === "string") {
      rawMarkdown = `---
description: test
---

## big text

Look, it's working. _This is in italics._
      
      `;
    } else if (ctx.params.slug === "file") {
      rawMarkdown = await Deno.readTextFile("posts/text.md");
    } else {
      return ctx.render(undefined);
    }
    const { attrs, body } = extract(rawMarkdown);
    return ctx.render({ markdown: body, data: attrs });
  },
};

export default function MarkdownPage({ data }: PageProps<Page | null>) {
  if (!data) {
    return <h1>File not found.</h1>;
  }

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main>
        <div>{JSON.stringify(data.data)}</div>
        <div
          class="markdown-body"
          style={{ background: "transparent" }}
          data-color-mode="dark"
          data-dark-theme="dark"
          data-light-theme="light"
          dangerouslySetInnerHTML={{ __html: render(data?.markdown) }}
        />
      </main>
    </>
  );
}


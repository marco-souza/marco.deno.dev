import { defineRoute } from "$fresh/server.ts";
import { css } from "@twind/core";
import { blog } from "~/services/blog.ts";

const zoomIn = css`
  transition: transform .2s;
  transform: scale(1.1);
`;

export default defineRoute(async () => {
  const posts = await blog.listPosts();
  return (
    <div class="grid gap-8">
      <h1 class="text-4xl">👋 Welcome to my blog</h1>
      {posts
        .sort((p1, p2) =>
          Date.parse(p2.attrs.created_at as string) -
          Date.parse(p1.attrs.created_at as string)
        )
        .map((post) => (
          <a href={post.href} class={`hover:${zoomIn}`}>
            <Card {...post.attrs} />
          </a>
        ))}
    </div>
  );
});

function Card({
  title = "",
  description = "",
  created_at = "",
}) {
  return (
    <div class="card  shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p class="text-sm text-gray-500">{created_at}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

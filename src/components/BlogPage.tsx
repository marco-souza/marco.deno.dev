import type { PostMetadata } from "~/services/blog.ts";

type Props = {
  posts: PostMetadata[];
};
export function BlogPage({ posts }: Props) {
  return (
    <div class="grid gap-8">
      <h1 class="text-4xl">👋 Marco's Blog</h1>
      {posts.map((post) => (
        <a href={post.href} class="transition-transform hover:scale-110">
          <Card {...post} />
        </a>
      ))}
    </div>
  );
}

function Card({
  title,
  created_at,
  description,
}: PostMetadata) {
  return (
    <div class="card shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        <p class="text-sm text-gray-500">{created_at}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

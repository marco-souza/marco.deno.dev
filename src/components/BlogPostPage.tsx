import { BackButton } from "~/components/BackButton.tsx";
import type { PostMetadata } from "~/services/blog.ts";

type Props = {
  content: string;
  metadata: PostMetadata;
};

export function BlogPostPage({ content, metadata }: Props) {
  const author = (
    <a href={metadata.author_url ?? "#"} class="text-pink-300">
      {metadata.author}
    </a>
  );
  // format as Sun Oct 10 2021
  const date = metadata.created_at
    .toUTCString() // 'Wed, 20 Nov 2024 16:16:43 GMT'
    .split(" ")
    .slice(0, 4) // ['Wed,', '20', 'Nov', '2024']
    .join(" ");

  return (
    <div>
      <h1 class="flex gap-2 text-4xl">
        <BackButton />
        {metadata.title}
      </h1>

      <p class="ml-14 text-sm text-gray-500">
        Posted at {date} by {author}
      </p>

      <div class="markdown-body card">
        <div
          class="card-body mx-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

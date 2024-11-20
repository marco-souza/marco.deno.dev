import { BackButton } from "~/components/BackButton.tsx";

type Props = {
  slug: string;
  content: string;
};

export function BlogPostPage({ content, slug }: Props) {
  return (
    <div>
      <h1 class="flex gap-2 text-4xl">
        <BackButton />
        {slug}
      </h1>

      <div class="markdown-body card">
        <div
          class="card-body"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}

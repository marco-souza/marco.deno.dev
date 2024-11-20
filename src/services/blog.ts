import { z } from "zod";
import { markdownMetadata, markdownToHTML } from "~/services/markdown.ts";

const PostMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  email: z.string().email(),
  created_at: z.string().transform((date) => new Date(date)),
  author_url: z.string().url().nullable(),
  href: z.string(),
});

const PostSchema = z.object({
  content: z.string(),
  metadata: z.object({
    arrayOf: z.array(PostMetadataSchema),
  }),
});

export type Post = z.infer<typeof PostSchema>;
export type PostMetadata = z.infer<typeof PostMetadataSchema>;

class Blog {
  constructor(private path = "./posts") {}

  async listPosts() {
    // list all files in path
    const filepath = Deno.realPathSync(this.path);
    const files = Deno.readDir(filepath);

    const posts: PostMetadata[] = [];
    for await (const file of files) {
      posts.push(readMarkdownMetadata(`${filepath}/${file.name}`, file.name));
    }

    // sort DESC by date
    return posts.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }

  async loadPost(slug: string) {
    const filename = `${slug}.md`;
    const filepath = `${this.path}/${filename}`;
    const metadata = readMarkdownMetadata(filepath, filename);

    const fileContent = await Deno.readTextFile(filepath);
    const content = await markdownToHTML(fileContent);

    return {
      metadata,
      content,
    };
  }
}

export const blog = new Blog();

function readMarkdownMetadata(filepath: string, name: string) {
  const content = Deno.readTextFileSync(filepath);
  const metadata = markdownMetadata(content);
  return PostMetadataSchema.parse({
    ...metadata,
    href: `/blog/${name.replace(/\.md$/, "")}`,
  });
}

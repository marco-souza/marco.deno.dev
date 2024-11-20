import { z } from "zod";
import { markdownMetadata } from "~/services/markdown.ts";

const PostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const PostMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  email: z.string().email(),
  created_at: z.string().transform((date) => new Date(date)),
  author_url: z.string().url().nullable(),
  href: z.string(),
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
      // read file
      const content = Deno.readTextFileSync(`${filepath}/${file.name}`);
      const metadata = markdownMetadata(content);
      console.log(metadata);

      // parse
      posts.push(PostMetadataSchema.parse({
        ...metadata,
        href: `/blog/${file.name.replace(/\.md$/, "")}`,
      }));
    }

    // sort DESC by date
    return posts.sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }

  async loadPost() {
    // TODO: fetch
    const post = PostSchema.parse({
      title: "Hello World",
      content: "Hello World!",
    });

    // TODO: parse
    // return markdownToHTML(body);

    return post;
  }
}

export const blog = new Blog();

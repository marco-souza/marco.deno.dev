import { z } from "zod";
import { extract } from "$std/front_matter/yaml.ts";

const metadataSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  author: z.string().trim().min(1),
  email: z.string().email(),
  created_at: z.string().trim().min(1).transform((date) => Date.parse(date)),
  author_url: z.string().url().nullable(),
});

class Blog {
  private postsPath = "posts/";

  async listPosts() {
    const files = Deno.readDirSync(this.postsPath);
    const rawPosts = Array.from(files)
      .filter((dir) => dir.isFile)
      .map((file) => file.name.split(".").at(0) ?? "")
      .map((slug) => this.readPost(slug));

    const posts = await Promise.all(rawPosts);
    return posts
      .map((post) => ({
        ...post,
        metadata: metadataSchema.parse(post.attrs),
      }))
      .sort((p1, p2) => p2.metadata.created_at - p1.metadata.created_at);
  }

  async readPost(slug: string) {
    const rawMarkdown = await Deno.readTextFile(
      `${this.postsPath}/${slug}.md`,
    );
    const markdown = extract(rawMarkdown);
    const href = "/blog/" + slug;

    return { ...markdown, href };
  }
}

export const blog = new Blog();

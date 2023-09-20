import { extract } from "$std/front_matter/yaml.ts";

class Blog {
  private postsPath = "posts/";

  listPosts() {
    const files = Deno.readDirSync(this.postsPath);
    const posts = Array.from(files)
      .filter((dir) => dir.isFile)
      .map((file) => file.name.split(".").at(0) ?? "")
      .map((slug) => this.readPost(slug));

    return Promise.all(posts);
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

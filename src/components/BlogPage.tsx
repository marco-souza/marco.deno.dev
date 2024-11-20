const blog = {
  listPosts: () => [
    {
      href: "/blog/hello-world",
      attrs: {
        title: "Hello World",
        description: "My first blog post",
        created_at: "2021-09-01",
      },
    },
    {
      href: "/blog/second-post",
      attrs: {
        title: "Second Post",
        description: "My second blog post",
        created_at: "2021-09-02",
      },
    },
  ],
};

export function BlogPage() {
  const posts = blog.listPosts();
  return (
    <div class="grid gap-8">
      <h1 class="text-4xl">👋 Marco's Blog</h1>
      {posts.map((post) => (
        <a href={post.href} class="hover:animate-zoom-in">
          <Card {...post.attrs} />
        </a>
      ))}
    </div>
  );
}

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

export default function Home() {
  const cardStyle = `
    px-8 m-2 py-4 max-w-sm rounded-md border
    hover:border-blue-300 hover:text-blue-300 hover:underline
  `;
  return (
    <>
      <h1 class="text-2xl text-center py-16">
        <p>Welcome to</p>
        <p class="text-4xl">
          Marco's <span class="text-yellow-300">lab</span>
          🧑🏽‍🔬
        </p>
      </h1>

      <div class="flex justify-center">
        {links.map((item) => (
          <a href={item.link}>
            <div class={cardStyle}>
              <h2>{item.name}</h2>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

const links: LinkItem[] = [
  { name: "About Me", link: "https://marco.tremtec.com" },
  { name: "Playground", link: "/playground/" },
];

interface LinkItem {
  name: string;
  link: string;
}

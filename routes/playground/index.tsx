export default function Home() {
  const cardStyle = `
    px-8 m-2 py-4 max-w-sm rounded-md border
    hover:border-pink-300 hover:text-pink-300
    hover:underline hover:shadow-md
  `;
  return (
    <>
      <h1 class="text-2xl text-center py-16">
        <p>Welcome to</p>
        <p class="text-4xl">
          my <span class="text-yellow-300">playground</span>
          🛝
        </p>
      </h1>

      <div class="flex justify-center flex-wrap">
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
  { name: "Github Finder", link: "/playground/github" },
  { name: "Counter", link: "/playground/counter" },
  { name: "Game of Life", link: "/playground/game-of-life" },
  { name: "Minesweeper", link: "/playground/minesweeper" },
];

interface LinkItem {
  name: string;
  link: string;
}

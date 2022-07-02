/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "twind";

export default function Home() {
  const cardStyle = tw`
    px-8 m-2 py-4 max-w-sm rounded-md border
    hover:border-blue-300 hover:text-blue-300 hover:underline
  `;
  return (
    <Fragment>
      <h1 class={tw`text-2xl text-center py-16`}>
        <p>Welcome to</p>
        <p class={tw`text-4xl`}>
          my <span class={tw`text-yellow-300`}>lab</span>
          🧑🏽‍🔬
        </p>
      </h1>

      <div class={tw`flex justify-center`}>
        {links.map((item) => (
          <a href={item.link}>
            <div class={cardStyle}>
              <h3>{item.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </Fragment>
  );
}

const links: LinkItem[] = [
  { name: "Playground", link: "/playground/counter" },
  { name: "Projects", link: "/projects" },
];

interface LinkItem {
  name: string;
  link: string;
}

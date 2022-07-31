/** @jsx h */
import { Fragment, h } from "preact";
import { PageProps } from "$fresh/server.ts";
import Minesweeper from "~islands/Minesweeper.tsx";
import { tw } from "~/configs/twind.ts";
import { GameLevel } from "~features/entities/minesweeper.ts";

export default function Home(props: PageProps) {
  const searchPrams = new URLSearchParams(props.url.search);
  const level: GameLevel = searchPrams.get("level") as GameLevel || "easy";

  return (
    <div class={tw`container px-6`}>
      <Minesweeper level={level} />
    </div>
  );
}

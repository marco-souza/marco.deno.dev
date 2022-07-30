/** @jsx h */
import { Fragment, h } from "preact";
import { PageProps } from "$fresh/server.ts";
import GameOfLifeBoard from "~islands/GameOfLifeBoard.tsx";
import { tw } from "~/configs/twind.ts";

export default function Home(props: PageProps) {
  const searchPrams = new URLSearchParams(props.url.search);
  const boardProps = {
    width: Number(searchPrams.get("width") || "30"),
    height: Number(searchPrams.get("height") || "10"),
  };

  return (
    <Fragment>
      <h1 class={tw`text-2xl`}>Game Of Life</h1>
      <GameOfLifeBoard {...boardProps} />
    </Fragment>
  );
}

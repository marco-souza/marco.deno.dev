/** @jsx h */
import { Fragment, h } from "preact";
import { PageProps } from "$fresh/server.ts";
import GameOfLifeBoard from "~islands/GameOfLifeBoard.tsx";

export default function Home(props: PageProps) {
  const searchPrams = new URLSearchParams(props.url.search);
  const boardProps = {
    width: Number(searchPrams.get("width") || "60"),
    height: Number(searchPrams.get("height") || "30"),
  };

  return (
    <Fragment>
      <h1>Game Of Life</h1>
      <GameOfLifeBoard {...boardProps} />
    </Fragment>
  );
}

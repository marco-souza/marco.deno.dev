import { PageProps } from "$fresh/server.ts";
import GameOfLifeBoard from "~islands/GameOfLifeBoard.tsx";

export default function Home(props: PageProps) {
  const searchPrams = new URLSearchParams(props.url.search);
  const boardProps = {
    width: Number(searchPrams.get("width") || "50"),
    height: Number(searchPrams.get("height") || "15"),
  };

  return (
    <>
      <h1 class="text-2xl">Game Of Life</h1>
      <GameOfLifeBoard {...boardProps} />
    </>
  );
}

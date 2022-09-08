import { PageProps } from "$fresh/server.ts";
import Minesweeper from "~islands/Minesweeper.tsx";
import { GameLevel } from "~features/entities/minesweeper.ts";

export default function Home(props: PageProps) {
  const searchPrams = new URLSearchParams(props.url.search);
  const level: GameLevel = searchPrams.get("level") as GameLevel || "easy";

  return (
    <div class="container">
      <Minesweeper level={level} />
    </div>
  );
}

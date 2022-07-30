/** @jsx h */
import { Fragment, h } from "preact";
import { useGameOfLife } from "~features/use-cases/useGameOfLife.tsx";
import GameOfLifeBoard from "~islands/GameOfLifeBoard.tsx";

export default function Home() {
  return (
    <Fragment>
      <h1>Game Of Life</h1>
      <GameOfLifeBoard />
    </Fragment>
  );
}

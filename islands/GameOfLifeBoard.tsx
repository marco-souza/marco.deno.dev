/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "~/configs/twind.ts";
import { useGameOfLife } from "~features/use-cases/useGameOfLife.tsx";
import { Position } from "~features/entities/game-of-life.ts";

const dim: Position = { x: 50, y: 50 };

export default function GameOfLifeBoard() {
  const { board, generation, next, start, stop, toggle } = useGameOfLife(dim);
  const deadCell = tw`bg-gray-800 h-3`;
  const aliveCell = tw`bg-green-500 h-3`;

  return (
    <Fragment>
      <div class={tw`flex gap-4 my-4`}>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={next}>next</button>
      </div>
      <p class={tw`text-gray-500 text-sm`}>Generation {generation}</p>
      <div class={tw(`grid gap-1 grid-cols-[repeat(${dim.x},1fr)]`)}>
        {board.map((row, x) =>
          row.map((cell, y) => (
            <div
              onClick={() => toggle({ x, y })}
              class={cell.isAlive ? aliveCell : deadCell}
            />
          ))
        )}
      </div>
    </Fragment>
  );
}

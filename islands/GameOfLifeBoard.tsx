/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "~/configs/twind.ts";
import { useGameOfLife } from "~features/use-cases/useGameOfLife.tsx";

interface Props {
  width: number;
  height: number;
}

export default function GameOfLifeBoard({ width, height }: Props) {
  const { board, generation, next, start, cleanup, stop, toggle } =
    useGameOfLife(width, height);
  const deadCell = tw`bg-gray-800 text-center`;
  const aliveCell = tw`bg-green-500 text-center`;

  return (
    <Fragment>
      <div class={tw`flex gap-4 my-4`}>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
        <button onClick={next}>next</button>
        <button onClick={cleanup}>cleanup</button>
      </div>
      <p class={tw`text-gray-500 text-sm`}>Generation {generation}</p>
      <div class={tw(`grid gap-1 grid-cols-[repeat(${width},1fr)]`)}>
        {board.map((row, line) =>
          row.map((cell, col) => (
            <div
              onClick={() => toggle({ line, col })}
              class={cell.isAlive ? aliveCell : deadCell}
            >
              {line}-{col}
            </div>
          ))
        )}
      </div>
    </Fragment>
  );
}

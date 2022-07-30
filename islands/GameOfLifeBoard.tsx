/** @jsx h */
import { h } from "preact";
import { tw } from "~/configs/twind.ts";
import { useGameOfLife } from "~features/use-cases/useGameOfLife.tsx";
import { Lazy } from "~/shared/components.tsx";

interface Props {
  width: number;
  height: number;
}

export default function GameOfLifeBoard({ width, height }: Props) {
  const { board, generation, next, start, cleanup, restart, stop, toggle } =
    useGameOfLife(width, height);
  const deadCell = tw`bg-gray-800 text-center py-2 cursor-pointer`;
  const aliveCell = tw`bg-green-500 text-center py-2 cursor-pointer`;

  return (
    <Lazy>
      <div class={tw`flex gap-4 my-4`}>
        <button onClick={start} title="play">▶️</button>
        <button onClick={stop} title="pause">⏸️</button>
        <button onClick={next} title="next">⏭</button>
        <button onClick={cleanup} title="cleanup">🗑️</button>
        <button onClick={restart} title="restart">♻️</button>
      </div>
      <p class={tw`text-gray-500 text-sm`}>Generation {generation}</p>
      <div class={tw(`grid gap-1 grid-cols-[repeat(${width},1fr)]`)}>
        {board.map((row, line) =>
          row.map((cell, col) => (
            <div
              onClick={() => toggle({ line, col })}
              class={cell.isAlive ? aliveCell : deadCell}
            >
              {cell.isAlive ? "🐣" : "💀"}
            </div>
          ))
        )}
      </div>
    </Lazy>
  );
}

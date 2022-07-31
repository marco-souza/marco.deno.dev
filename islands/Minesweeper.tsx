/** @jsx h */
import { h } from "preact";
import { tw } from "~/configs/twind.ts";
import { Lazy } from "~/shared/components.tsx";
import { GameLevel, getCellContent } from "~features/entities/minesweeper.ts";
import { useMinesweeper } from "~features/use-cases/useMinesweeper.tsx";

interface MinesweeperProps {
  level: GameLevel;
}

export default function Minesweeper(
  { level }: MinesweeperProps,
) {
  const {
    board,
    time,
    mark,
    open,
    cols,
    lines,
    startStop,
  } = useMinesweeper(level);
  const visibleCell = tw`bg-gray-300 text-center py-2 cursor-pointer`;
  const closedCell = tw`bg-gray-500 text-center py-2 cursor-pointer`;

  return (
    <Lazy>
      <div class={tw`flex gap-4 my-4`}>
        <button onClick={startStop} title="New Game">
          ▶️
        </button>
      </div>
      <p class={tw`text-gray-300 text-sm`}>time: {time}s</p>
      <div
        class={tw(
          `grid gap-1 grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${lines},3rem)]`,
        )}
      >
        {board.map((row, line) =>
          row.map((cell, col) => (
            <div
              onClick={() => open({ line, col })}
              onContextMenu={(e) => {
                e?.preventDefault();
                mark({ line, col });
              }}
              class={cell.state === "visible" ? visibleCell : closedCell}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>
    </Lazy>
  );
}

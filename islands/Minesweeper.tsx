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
  const visibleCell =
    tw`bg-gray-200 text-center py-2 cursor-pointer text-gray-800 hover:shadow-xl hover:bg-gray-300`;
  const closedCell =
    tw`bg-gray-400 text-center py-2 cursor-pointer hover:shadow-xl hover:bg-gray-300`;

  // TODO: select level
  // TODO: hide board until isRunning

  return (
    <Lazy>
      <div class={tw`flex gap-4 my-4`}>
        <h1 class={tw`text-2xl`}>Minesweeper</h1>
        <button onClick={startStop} title="New Game">
          ▶️
        </button>
      </div>
      <p class={tw`text-gray-300 text-sm`}>time: {time}s</p>
      <div
        class={tw(
          `grid gap-2 grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${lines},3rem)]`,
        )}
      >
        {board.map((row, line) =>
          row.map((cell, col) => {
            let content = "";
            if (cell.state === "visible") content = cell.content;
            if (cell.state === "flagged") content = "🚩";
            return (
              <div
                onClick={() => open({ line, col })}
                onContextMenu={(e) => {
                  e?.preventDefault();
                  mark({ line, col });
                }}
                class={cell.state === "visible" ? visibleCell : closedCell}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
    </Lazy>
  );
}

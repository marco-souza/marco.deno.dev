/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "~/configs/twind.ts";
import { Lazy } from "~/shared/components.tsx";
import { Game, GameLevel } from "~features/entities/minesweeper.ts";
import { useMinesweeper } from "~features/use-cases/useMinesweeper.tsx";
import {
  GameStatus,
  MinesweeperGame,
} from "../packages/features/services/minesweeper.ts";

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
    status,
    newGame,
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
      <div class={tw`flex gap-4 py-4`}>
        <h1 class={tw`text-2xl`}>Minesweeper</h1>

        <button onClick={startStop} title="Start/Stop (Space)">
          {status === "running" ? " ⏸️" : "▶️"}
        </button>
        <button onClick={newGame} title="New Game (N)">
          ♻️
        </button>

        <span class={tw`text-gray-300 text-sm py-2`}>
          <ContentByStatus status={status} />
          {` - ${time}s`}
        </span>
      </div>
      <div
        class={tw(
          `grid gap-2 grid-cols-[repeat(${cols},1fr)] grid-rows-[repeat(${lines},3rem)]`,
        )}
      >
        {status !== "paused"
          ? board.map((row, line) =>
            row.map((cell, col) => {
              let content = "";
              if (cell.state === "flagged") content = "🚩";

              // make all visible if user lost the game
              const isVisible = cell.state === "visible" ||
                (status === "lost" && cell.content != "");
              if (isVisible) content = cell.content;

              return (
                <div
                  onClick={() => {
                    if (status === "lost") return;
                    open({ line, col });
                  }}
                  onContextMenu={(e) => {
                    if (status === "lost") return;
                    e?.preventDefault();
                    mark({ line, col });
                  }}
                  class={isVisible ? visibleCell : closedCell}
                >
                  {content}
                </div>
              );
            })
          )
          : null}
      </div>
    </Lazy>
  );
}

const ContentByStatus = ({ status }: Pick<MinesweeperGame, "status">) => {
  switch (status) {
    case "lost":
      return <span>You lost :(</span>;
    case "won":
      return <span>You Won! :D</span>;
    case "paused":
      return <span>Paused</span>;
    case "running":
      return <span>Running</span>;
  }
};

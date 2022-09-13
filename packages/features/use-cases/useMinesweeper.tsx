import { useMemo } from "preact/hooks";
import { useKeyboardHandler } from "~hooks";
import { GameLevel } from "~features/entities/minesweeper.ts";
import { MinesweeperGame } from "~features/services/minesweeper.ts";
import { GridPosition } from "~/shared/types.ts";

export const useMinesweeper = (level: GameLevel) => {
  const game = useMemo(
    () => MinesweeperGame.createGame(level),
    [level],
  );

  useKeyboardHandler({
    " ": () => game.playPause(),
    "N": () => game.reset(),
  });

  return {
    cols: game.cols,
    lines: game.lines,
    status: game.status,
    gameState: game.gameState,
    newGame: () => game.reset(),
    startStop: () => game.playPause(),
    open: (pos: GridPosition) => game.open(pos),
    mark: (pos: GridPosition) => game.mark(pos),
  };
};

import { useEffect, useMemo } from "preact/hooks";
import { useExternalSync, useKeyboardHandler } from "~/shared/hooks.ts";
import { GameLevel } from "~features/entities/minesweeper.ts";
import { MinesweeperGame } from "~features/services/minesweeper.ts";
import { GridPosition } from "~/shared/types.ts";

export const useMinesweeper = (level: GameLevel) => {
  const game = useMemo(
    () => MinesweeperGame.createGame(level),
    [level],
  );

  const gameStore = useExternalSync(
    game.subscribe.bind(game),
    () => game.game,
    game.game,
  );

  useKeyboardHandler({
    " ": () => game.playPause(),
    "N": () => game.reset(),
  });

  return {
    ...gameStore,
    cols: game.cols,
    lines: game.lines,
    status: game.status,
    newGame: () => game.reset(),
    startStop: () => game.playPause(),
    open: (pos: GridPosition) => game.open(pos),
    mark: (pos: GridPosition) => game.mark(pos),
  };
};

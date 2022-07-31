/** @jsx h */
import { useMemo } from "preact/hooks";
import { useExternalSync } from "~/shared/hooks.ts";
import { GameLevel } from "~features/entities/minesweeper.ts";
import { MinesweeperGame } from "~features/services/minesweeper.ts";
import { GridPosition } from "../../shared/types.ts";

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

  return {
    ...gameStore,
    cols: game.cols,
    lines: game.lines,
    status: game.status,
    startStop: () => game.playPause(),
    open: (pos: GridPosition) => game.open(pos),
    mark: (pos: GridPosition) => game.mark(pos),
  };
};

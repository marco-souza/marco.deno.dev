/** @jsx h */
import { useEffect, useState } from "preact/hooks";
import { GameBoard } from "~features/services/game-of-life.ts";
import { Board, Position } from "../entities/game-of-life.ts";

export function useGameOfLife(width: number, height: number) {
  const [board, setBoard] = useState<Board>([]);
  const game = GameBoard.getInstance(width, height);

  useEffect(() => {
    const subID = "gol-hook-id";
    game.subscribe(subID, setBoard);
  }, []);

  return {
    board,
    generation: game.generation,
    start: () => game.startGame(),
    stop: () => game.stopTicker(),
    next: () => game.next(),
    cleanup: () => game.cleanup(),
    toggle: (pos: Position) => game.toggleLife(pos),
  };
}

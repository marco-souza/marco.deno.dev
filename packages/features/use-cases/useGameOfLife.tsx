/** @jsx h */
import { useEffect, useState } from "preact/hooks";
import { GameBoard } from "~features/services/game-of-life.ts";
import { Board, Position } from "../entities/game-of-life.ts";

export function useGameOfLife(dim: Position) {
  const [board, setBoard] = useState<Board>([]);
  const game = GameBoard.getInstance();

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
    toggle: (pos: Position) => game.toggleLife(pos),
  };
}

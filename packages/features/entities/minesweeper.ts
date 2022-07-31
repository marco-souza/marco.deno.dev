import { GridPosition } from "~/shared/types.ts";

export type CellState = "closed" | "visible" | "flagged";

export interface Cell {
  state: CellState;
  isMine: boolean;
}

export function makeCell(partialCell: Partial<Cell>): Cell {
  return {
    isMine: false,
    state: "closed",
    ...partialCell,
  };
}

export function getCellContent(cell: Cell): string {
  switch (cell.state) {
    case "flagged":
      return "🚩";
    case "visible":
      return cell.isMine ? "💣" : "";
  }
  return "";
}

export type Board = Cell[][];

export interface Game {
  time: number;
  board: Board;
  mines: {
    amount: number;
    remaining: number;
  };
}

export function makeGame(
  lines: number,
  cols: number,
  minesAmount: number,
): Game {
  const board = makeBoard(lines, cols);
  return {
    time: 0,
    board: makeRandomMines(board, minesAmount),
    mines: { amount: minesAmount, remaining: 0 },
  };
}

function makeBoard(lines: number, cols: number): Board {
  return Array.from(
    { length: lines },
    () =>
      Array.from(
        { length: cols },
        // TODO: generate mines
        () => makeCell({ isMine: false }),
      ),
  );
}

export type GameLevel = "easy" | "medium" | "hard";

interface GameConfig {
  lines: number;
  cols: number;
  minesAmount: number;
}

export const GameLevelConfigMap: Record<GameLevel, GameConfig> = {
  "easy": { cols: 9, lines: 9, minesAmount: 10 },
  "medium": { cols: 16, lines: 16, minesAmount: 40 },
  "hard": { cols: 30, lines: 16, minesAmount: 99 },
};

function makeRandomMines(board: Board, minesAmount: number): Board {
  const allPositions = board.flatMap((l, line) => (
    l.map((_, col) =>
      <GridPosition> (
        { col, line }
      )
    )
  ));
  const mines: GridPosition[] = sampleSize(allPositions, minesAmount);
  mines.forEach((pos) => {
    board[pos.line][pos.col].isMine = true;
  });

  return board;
}

const sampleSize = <A>(list: A[], amount: number) => (
  times(amount)
    .map(() => randPosition(list))
    .map((pos) => list[pos])
);

const times = (num: number) => {
  return Array.from({ length: num });
};

const randPosition = <T>(list: T[]): number =>
  Math.ceil(Math.random() * list.length);

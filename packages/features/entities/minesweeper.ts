import { GridPosition } from "~/shared/types.ts";

export type CellState = "closed" | "visible" | "flagged";

export interface Cell {
  state: CellState;
  isMine: boolean;
  content: string;
  neighbors: GridPosition[];
}

export function makeCell(partialCell: Partial<Cell>): Cell {
  return {
    isMine: false,
    state: "closed",
    content: "",
    neighbors: [],
    ...partialCell,
  };
}

export function getCellContent(board: Board, pos: GridPosition): string {
  const cell = board[pos.line][pos.col];
  if (cell.isMine) return "💣";

  const minesClose = countCloseMines(cell, board);
  if (minesClose > 0) return minesClose.toString();
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
    (_, line) =>
      Array.from(
        { length: cols },
        (_, col) =>
          makeCell({
            isMine: false,
            neighbors: neighborsPositions(cols, lines, { line, col }),
          }),
      ),
  );
}

export type GameLevel = "baby" | "easy" | "medium" | "hard";

interface GameConfig {
  lines: number;
  cols: number;
  minesAmount: number;
}

export const GameLevelConfigMap: Record<GameLevel, GameConfig> = {
  "baby": { cols: 9, lines: 9, minesAmount: 10 },
  "easy": { cols: 16, lines: 9, minesAmount: 20 },
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

  // populate mines
  const mines: GridPosition[] = sampleSize(allPositions, minesAmount);
  mines.forEach((pos) => {
    board[pos.line][pos.col].isMine = true;
  });

  // calculate mines close
  board.map((_, line) => (
    board[line].map((cell, col) => (
      cell.content = getCellContent(board, { col, line })
    ))
  ));

  return board;
}

const sampleSize = <A>(list: A[], amount: number): A[] => {
  const sampleSet = new Set<A>();

  while (sampleSet.size < amount) {
    const pos = randPosition(list);
    sampleSet.add(list[pos]);
  }

  return [...sampleSet];
};

const randPosition = <T>(list: T[]): number =>
  Math.ceil(Math.random() * list.length);

const NEIGHBORS_POSITIONS = [-1, 0, 1];
const neighborsPositions = (
  width: number,
  height: number,
  pos: GridPosition,
): GridPosition[] => {
  const neighbors: GridPosition[] = [];

  for (const linePos of NEIGHBORS_POSITIONS) {
    const line = pos.line + linePos;
    if (line < 0 || line >= height) continue;

    for (const colPos of NEIGHBORS_POSITIONS) {
      if (linePos === 0 && colPos === 0) continue;

      const col = pos.col + colPos;
      if (col < 0 || col >= width) continue;

      neighbors.push({ col, line });
    }
  }

  return neighbors;
};

const countCloseMines = (cell: Cell, board: Board): number => {
  let count = 0;

  for (const { col, line } of cell.neighbors) {
    const neighborCell = board[line][col];
    if (neighborCell.state === "visible") continue;
    if (neighborCell.isMine) count++;
  }

  return count;
};

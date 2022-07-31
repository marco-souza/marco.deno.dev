export interface Position {
  line: number;
  col: number;
}

export interface Cell {
  isAlive: boolean;
  pos: Position;
  getNeighborsPositions: () => Position[];
}

export type Board = Cell[][];

export function makeCell(pos: Position, isAlive: boolean, dim: Position): Cell {
  return {
    pos,
    isAlive,
    getNeighborsPositions: () => {
      const neighbors = new Set<Position>();
      const options = [-1, 0, 1];

      for (const opX of options) {
        for (const opY of options) {
          if (opX === opY && opX === 0) continue;

          const newPos = {
            line: (pos.line + opX) % dim.line,
            col: (pos.col + opY) % dim.col,
          };

          if (newPos.line < 0) newPos.line += dim.line;
          if (newPos.col < 0) newPos.col += dim.col;

          neighbors.add(newPos);
        }
      }
      return [...neighbors];
    },
  };
}

export interface GameOfLife {
  width: number;
  height: number;
  board: Board;
}

export function makeGameOfLife(
  { height = 0, width = 0 }: Partial<GameOfLife>,
): GameOfLife {
  const dim = { col: width, line: height };
  const board = Array.from(
    { length: height },
    (_, line) =>
      Array.from(
        { length: width },
        (_, col) => makeCell({ line, col }, randomLife(), dim),
      ),
  );

  return {
    width,
    height,
    board,
  };
}

const LIFE_RATE = 1 - 0.2; // 20%
const randomLife = () => Math.random() > LIFE_RATE;

export function getNextGeneration(board: Board): Board {
  return board.map((line) =>
    line.map((cell) => {
      const neighbors = cell.getNeighborsPositions();
      const aliveNeighbors = neighbors.filter((pos) =>
        board[pos.line][pos.col].isAlive
      ).length;

      if (cell.isAlive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          return { ...cell, isAlive: false };
        }
      }

      if (aliveNeighbors === 3) {
        cell.isAlive = true;
        return { ...cell, isAlive: true };
      }
      return cell;
    })
  );
}

export interface Position {
  x: number;
  y: number;
}

export interface Cell {
  isAlive: boolean;
  pos: Position;
  getNeighborsPositions: () => Position[];
}

export type Board = Cell[][];

export function makeCell(
  x: number,
  y: number,
  isAlive: boolean,
  dim: Position,
): Cell {
  return {
    isAlive,
    pos: { x, y },
    getNeighborsPositions: () => {
      const neighbors = new Set<Position>();
      const options = [-1, 0, 1];

      for (const opX of options) {
        for (const opY of options) {
          const pos = {
            x: (x + opX) % dim.x,
            y: (y + opY) % dim.y,
          };

          if (pos.x < 0) pos.x = dim.x + pos.x;
          if (pos.y < 0) pos.y = dim.y + pos.y;

          neighbors.add(pos);
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

export function makeGameOfLife(width: number, height: number): GameOfLife {
  const dim = { x: width, y: height };
  const board = Array.from(
    { length: width },
    (_, x) =>
      Array.from(
        { length: height },
        (_, y) => makeCell(x, y, randomLife(), dim),
      ),
  );

  return {
    width,
    height,
    board,
  };
}

const randomLife = () => Math.random() > 0.7;

export function getNextGeneration(board: Board): Board {
  return board.map((row, x) => {
    return row.map((cell, y) => {
      const neighbors = cell.getNeighborsPositions();
      const aliveNeighbors = neighbors.filter((pos) =>
        board[pos.x][pos.y].isAlive
      ).length;
      const dim = { x: board.length, y: row.length };

      if (cell.isAlive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          return makeCell(x, y, false, dim);
        }
      } else {
        if (aliveNeighbors === 3) {
          return makeCell(x, y, true, dim);
        }
      }

      return cell;
    });
  });
}

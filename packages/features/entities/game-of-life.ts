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
  life?: boolean,
): GameOfLife {
  const dim = { col: width, line: height };
  console.log(dim);
  const board = Array.from(
    { length: height },
    (_, line) =>
      Array.from(
        { length: width },
        (_, col) => makeCell({ line, col }, life ?? randomLife(), dim),
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
  return board.map((row, line) => {
    return row.map((cell, col) => {
      const neighbors = cell.getNeighborsPositions();
      const aliveNeighbors = neighbors.filter((pos) =>
        board[pos.line][pos.col].isAlive
      ).length;
      const dim = { line: board.length, col: row.length };

      if (cell.isAlive) {
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          return makeCell({ line, col }, false, dim);
        }
      } else {
        console.log({ neighbors });
        if (aliveNeighbors === 3) {
          return makeCell(cell.pos, true, dim);
        }
      }

      return cell;
    });
  });
}

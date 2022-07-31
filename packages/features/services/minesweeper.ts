import { Evt } from "evt";
import {
  Game,
  GameLevel,
  GameLevelConfigMap,
  makeGame,
} from "~features/entities/minesweeper.ts";
import { GridPosition, Maybe } from "~/shared/types.ts";

export class MinesweeperGame {
  game: Game;
  #gameEvents: Evt<Game>;
  #intervalId: Maybe<number> = null;

  constructor(public lines: number, public cols: number, minesAmount: number) {
    this.game = makeGame(lines, cols, minesAmount);
    this.#gameEvents = Evt.create<Game>();
  }

  subscribe(handler: (game: Game) => void) {
    this.#gameEvents.attach(handler);
  }

  playPause() {
    if (this.#intervalId != null) {
      // is running
      clearInterval(this.#intervalId);
      this.#intervalId = null;
      return;
    }

    this.#intervalId = setInterval(
      () => {
        this.game.time++;
        this.#gameEvents.post(this.game);
      },
      SECOND,
    );
  }

  open(pos: GridPosition) {
    this.openRecursive(pos);
    this.#gameEvents.post(this.game);
  }

  openRecursive(pos: GridPosition) {
    const cell = this.game.board[pos.line][pos.col];
    if (cell.state === "flagged") return;
    if (cell.state === "closed") {
      cell.state = "visible";
      // open neighbors recursively
      if (cell.content === "") {
        cell.neighbors.forEach((p) => this.openRecursive(p));
      }
    } else if (cell.state === "visible") {
      // count flagged neighbors
      const countFlagged = cell.neighbors.reduce(
        (acc, { col, line }) =>
          this.game.board[line][col].state === "flagged" ? acc + 1 : acc,
        0,
      );
      // if all marked, open closed neighbors
      if (countFlagged.toString() === cell.content) {
        cell.neighbors
          .filter((p) => this.game.board[p.line][p.col].state === "closed")
          .forEach((p) => this.openRecursive(p));
      }
    }
  }

  mark(pos: GridPosition) {
    const cell = this.game.board[pos.line][pos.col];
    if (cell.state === "closed") {
      cell.state = "flagged";
    } else if (cell.state === "flagged") {
      cell.state = "closed";
    }
    this.#gameEvents.post(this.game);
  }

  static createGame(level: GameLevel): MinesweeperGame {
    const { lines, cols, minesAmount } = GameLevelConfigMap[level];
    return new MinesweeperGame(lines, cols, minesAmount);
  }
}

const SECOND = 1000;

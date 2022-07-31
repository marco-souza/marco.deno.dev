import { Evt } from "evt";
import {
  Game,
  GameLevel,
  GameLevelConfigMap,
  makeGame,
} from "~features/entities/minesweeper.ts";
import { GridPosition, Maybe } from "~/shared/types.ts";

export type GameStatus = "running" | "paused" | "won" | "lost";

export class MinesweeperGame {
  game: Game;
  status: GameStatus = "paused";
  private gameEvents: Evt<Game>;
  private intervalId: Maybe<number> = null;

  constructor(public lines: number, public cols: number, minesAmount: number) {
    this.game = makeGame(lines, cols, minesAmount);
    this.gameEvents = Evt.create<Game>();
  }

  subscribe(handler: (game: Game) => void) {
    this.gameEvents.attach(handler);
  }

  playPause() {
    if (this.intervalId != null) {
      // is running
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.status = "paused";
      this.gameEvents.post(this.game);
      return;
    }

    this.intervalId = setInterval(
      () => {
        this.game.time++;
        this.gameEvents.post(this.game);
      },
      SECOND,
    );
    this.status = "running";
    this.gameEvents.post(this.game);
  }

  // TODO: add Winning condition

  mark(pos: GridPosition) {
    const cell = this.getCellByPosition(pos);
    if (cell.state === "closed") {
      cell.state = "flagged";
      this.game.mines.remaining--;
    } else if (cell.state === "flagged") {
      cell.state = "closed";
      this.game.mines.remaining++;
    }
    this.gameEvents.post(this.game);
  }

  open(pos: GridPosition) {
    this.openRecursive(pos);
    this.gameEvents.post(this.game);
  }

  private openRecursive(pos: GridPosition) {
    const cell = this.getCellByPosition(pos);
    if (cell.state === "flagged") return;
    if (cell.state === "closed") {
      cell.state = "visible";
      if (cell.isMine) {
        this.playPause();
        this.status = "lost";
        return;
      }
      // open neighbors recursively
      if (cell.content === "") {
        cell.neighbors.forEach((p) => this.openRecursive(p));
      }
    } else if (cell.state === "visible") {
      // count flagged neighbors
      const countFlagged = cell.neighbors.reduce(
        (acc, pos) =>
          this.getCellByPosition(pos).state === "flagged" ? acc + 1 : acc,
        0,
      );
      // if all marked, open closed neighbors
      if (countFlagged.toString() === cell.content) {
        cell.neighbors
          .filter((p) => this.getCellByPosition(p).state === "closed")
          .forEach((p) => this.openRecursive(p));
      }
    }
  }

  private getCellByPosition(pos: GridPosition) {
    return this.game.board[pos.line][pos.col];
  }

  static createGame(level: GameLevel): MinesweeperGame {
    const { lines, cols, minesAmount } = GameLevelConfigMap[level];
    return new MinesweeperGame(lines, cols, minesAmount);
  }
}

const SECOND = 1000;

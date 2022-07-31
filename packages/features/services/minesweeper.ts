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
      },
      SECOND,
    );
    this.#gameEvents.post(this.game);
  }

  open(pos: GridPosition) {
    const cell = this.game.board[pos.line][pos.col];
    if (cell.state === "closed") {
      cell.state = "visible";
    } else if (cell.state === "visible") {
      // TODO: open neighbors recursively
    }
    this.#gameEvents.post(this.game);
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

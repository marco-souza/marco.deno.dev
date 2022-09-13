import {
  Cell,
  Game,
  GameLevel,
  GameLevelConfigMap,
  makeGame,
} from "~features/entities/minesweeper.ts";
import { GridPosition, Maybe } from "~/shared/types.ts";
import { Signal, signal } from "@preact/signals";

export type GameStatus = "running" | "paused" | "won" | "lost";

export class MinesweeperGame {
  gameState: Signal<Game>;
  status: Signal<GameStatus>;
  private intervalId: Maybe<number> = null;

  constructor(
    public lines: number,
    public cols: number,
    private minesAmount: number,
  ) {
    this.gameState = signal(makeGame(lines, cols, minesAmount));
    this.status = signal<GameStatus>("paused");
  }

  reset() {
    this.stop();
    this.gameState.value = makeGame(this.lines, this.cols, this.minesAmount);
    this.start();
  }

  playPause() {
    // is running
    if (this.intervalId != null) {
      return this.stop();
    }
    this.start();
  }

  // TODO: add Winning condition

  mark(pos: GridPosition) {
    const cell = this.getCellByPosition(pos);
    const { mines } = this.gameState.value;
    if (cell.state === "closed") {
      cell.state = "flagged";
      mines.remaining--;
    } else if (cell.state === "flagged") {
      cell.state = "closed";
      mines.remaining++;
    }
    this.setGameState({
      mines: { ...mines },
    });
    this.setCellInBoardByPosition(pos, cell);
  }

  open(pos: GridPosition) {
    this.openRecursive(pos);
  }

  private start() {
    if (this.intervalId != null) return;
    // is not running
    this.intervalId = setInterval(
      () => {
        let { time } = this.gameState.value;
        time++;
        this.setGameState({ time });
      },
      SECOND,
    );
    this.status.value = "running";
  }

  private stop() {
    if (this.intervalId == null) return;
    // is running
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.status.value = "paused";
  }

  private openRecursive(pos: GridPosition) {
    const cell = this.getCellByPosition(pos);
    if (cell.state === "flagged") return;
    if (cell.state === "closed") {
      cell.state = "visible";
      if (cell.isMine) {
        this.playPause();
        this.status.value = "lost";
        this.setCellInBoardByPosition(pos, cell);
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
    this.setCellInBoardByPosition(pos, cell);
  }

  private setCellInBoardByPosition(pos: GridPosition, cell: Cell) {
    const { board } = this.gameState.value;
    board[pos.line][pos.col] = cell;
    this.setGameState({
      board: board.map((line) => line.map((x) => x)),
    });
  }

  private getCellByPosition(pos: GridPosition) {
    return this.gameState.value.board[pos.line][pos.col];
  }

  private setGameState(state: Partial<Game>) {
    this.gameState.value = {
      ...this.gameState.value,
      ...state,
    };
  }

  static createGame(level: GameLevel): MinesweeperGame {
    const { lines, cols, minesAmount } = GameLevelConfigMap[level];
    return new MinesweeperGame(lines, cols, minesAmount);
  }
}

const SECOND = 1000;

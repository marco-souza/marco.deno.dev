import {
  Board,
  GameOfLife,
  getNextGeneration,
  makeGameOfLife,
  Position,
} from "~features/entities/game-of-life.ts";
import { Maybe } from "~/shared/types.ts";
import { logger } from "~logger";
import { Signal, signal } from "@preact/signals";

export class GameBoard {
  generation = 1;
  isRunning = false;
  gameState: Signal<GameOfLife>;
  #intervalId: Maybe<number> = null;

  constructor(width: number, height: number) {
    this.gameState = signal(makeGameOfLife({ height, width }));
  }

  restart() {
    this.gameState.value = makeGameOfLife(this.gameState.value);
  }

  toggleLife(pos: Position) {
    const { board } = this.gameState.value;
    const cell = board[pos.line][pos.col];
    cell.isAlive = !cell.isAlive;

    this.#setBoard([...board]);
  }

  cleanup() {
    const newBoard: Board = this.gameState.value.board.map((row) =>
      row.map((col) => ({ ...col, isAlive: false }))
    );
    this.#setBoard(newBoard);
  }

  next() {
    logger.info("next running");

    this.#setBoard(
      getNextGeneration(this.gameState.value.board),
    );
    this.generation++;
  }

  startGame(interval = 300) {
    if (this.#intervalId != null) return;

    logger.info("starting interval");
    this.#intervalId = setInterval(() => this.next(), interval);
    this.isRunning = true;
  }

  stopTicker() {
    if (this.#intervalId) {
      logger.info("stopping ticker");
      clearInterval(this.#intervalId);
      this.#intervalId = null;
      this.isRunning = false;
    }
  }

  #setBoard(board: Board) {
    this.gameState.value = {
      ...this.gameState.value,
      board,
    };
  }

  static getInstance(width: number, height: number): GameBoard {
    if (instance == null) {
      instance = new GameBoard(width, height);
    }
    return instance;
  }
}

let instance: Maybe<GameBoard> = null;

type Handler = (board: Board) => void;

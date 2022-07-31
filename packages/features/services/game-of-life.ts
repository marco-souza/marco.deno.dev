import {
  Board,
  GameOfLife,
  getNextGeneration,
  makeGameOfLife,
  Position,
} from "~features/entities/game-of-life.ts";
import { Maybe } from "~/shared/types.ts";
import { logger } from "~logger";

export class GameBoard {
  generation = 1;
  isRunning = false;
  #game: GameOfLife;
  #intervalId: Maybe<number> = null;
  #listenersMap: Record<string, Handler> = {};

  constructor(width: number, height: number) {
    this.#game = makeGameOfLife({ height, width });
  }

  restart() {
    this.#game = makeGameOfLife(this.#game);
    this.#broadcast();
  }

  toggleLife(pos: Position) {
    const cell = this.#getGame().board[pos.line][pos.col];
    cell.isAlive = !cell.isAlive;
    this.#broadcast();
  }

  cleanup() {
    this.#game.board.forEach((row) =>
      row.forEach((col) => col.isAlive = false)
    );
    this.#broadcast();
  }

  next() {
    logger.info("next running");

    const game = this.#getGame();
    game.board = getNextGeneration(game.board);
    this.generation++;

    // broadcast to listeners
    this.#broadcast();
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

  subscribe(id: string, handler: Handler) {
    logger.info("Subscribing", id);
    this.#listenersMap[id] = handler;
    handler(this.#getGame().board);
  }

  unsubscribe(id: string) {
    delete this.#listenersMap[id];
  }

  #getGame() {
    if (this.#game == null) {
      throw new Error("Please define the board size with");
    }
    return this.#game;
  }

  #broadcast() {
    const game = this.#getGame();
    // broadcast to listeners
    Object.values(this.#listenersMap).forEach((handler) =>
      handler([...game.board])
    );
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

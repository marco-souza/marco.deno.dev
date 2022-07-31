export type Maybe<T> = T | null;

export type GridPosition = {
  line: number;
  col: number;
};

// Observable Pattern

export interface Event {
  type: string;
}

export interface Subscriber {
  update(event: Event): void;
}

export class AbsPublisher<State, S extends Subscriber> {
  private subscribers: Subscriber[] = [];

  constructor(public state: State) {}

  notifySubscribers = (event: Event) => {
    this.subscribers.forEach((s) => s.update(event));
  };

  subscribe = (sub: S) => toImplement("subscribe");

  unsubscribe = (sub: S) => toImplement("unsubscribe");

  start = () => {
    // TODO: main business logic
    toImplement("start");
  };
}

const toImplement = (methodName: string) => {
  throw new Error(`'${methodName}' method needs to be implemented!`);
};

import { kv } from "~/repositories/kv.ts";

export const TOPICS_ENUM = [
  "download-music",
] as const;

export type Topic = typeof TOPICS_ENUM[number];

export type Strategy<T> = (payload: Message<T>) => void;

export type Message<P> = {
  type: Topic;
  payload: P;
};

function postMessage<P>(message: Message<P>) {
  return kv.enqueue(message);
}

function strategyBuilder() {
  // deno-lint-ignore no-explicit-any
  const strategies: Map<Topic, Strategy<any>> = new Map();

  const instance = {
    addStrategy: <T>(topic: Topic, strategy: Strategy<T>) => {
      strategies.set(topic, strategy);
      return instance;
    },
    messageListener: <T>(msg: Message<T>) => {
      const strategy = strategies.get(msg.type);
      if (strategy) {
        console.log(`Executing strategy for topic: ${msg.type}`);
        return strategy(msg);
      }

      console.warn(`No strategy found for topic: ${msg.type}`);
      return;
    },
  };

  return instance;
}

function listenMessages(strategies: ReturnType<typeof strategyBuilder>) {
  return kv.listenQueue(strategies.messageListener);
}

export default {
  postMessage,
  strategyBuilder,
  listenMessages,
};

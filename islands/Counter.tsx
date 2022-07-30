/** @jsx h */
import { FunctionComponent, h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import {
  CounterProvider,
  useCounter,
  useCounterActions,
} from "#/packages/features/counter/context.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  return (
    <CounterProvider counter={props.start}>
      <CounterContent />
    </CounterProvider>
  );
}

const CounterContent: FunctionComponent = () => {
  const { counter } = useCounter();
  const { increment, decrement } = useCounterActions();
  const btn =
    tw`px-2 py-1 border(gray-100 1) text-gray-900 hover:bg-gray-200 bg-blue-100`;

  return (
    <div class={tw`flex gap-2 w-full`}>
      <p class={tw`flex-grow-1 font-bold text-xl`}>{counter}</p>
      <button
        class={btn}
        onClick={() => decrement()}
        disabled={!IS_BROWSER}
      >
        -1
      </button>
      <button
        class={btn}
        onClick={increment}
        disabled={!IS_BROWSER}
      >
        +1
      </button>
    </div>
  );
};

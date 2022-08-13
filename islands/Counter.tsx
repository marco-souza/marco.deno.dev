/** @jsx h */
import { FunctionComponent, h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { Lazy } from "~/shared/components.tsx";
import { dec, inc, state } from "~features/store/counter.ts";

export default function Counter() {
  return (
    <Lazy>
      <CounterContent />
    </Lazy>
  );
}

const CounterContent: FunctionComponent = () => {
  const store = state();
  const btn =
    tw`px-2 py-1 border(gray-100 1) text-gray-900 hover:bg-gray-200 bg-blue-100`;

  return (
    <div class={tw`flex gap-2 w-full`}>
      <p class={tw`flex-grow-1 font-bold text-xl`}>{store.counter}</p>
      <button class={btn} onClick={() => dec(2)} disabled={!IS_BROWSER}>
        -1
      </button>
      <button class={btn} onClick={() => inc(2)} disabled={!IS_BROWSER}>
        +1
      </button>
    </div>
  );
};

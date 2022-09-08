import { FunctionComponent } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Lazy } from "~/shared/components.tsx";
import { counter, dec, inc } from "~features/store/counter.ts";

export default function Counter() {
  return (
    <Lazy>
      <CounterContent />
    </Lazy>
  );
}

const CounterContent: FunctionComponent = () => {
  const btn = `px-2 py-1 text-gray-900 hover:bg-gray-200 bg-blue-100`;

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{counter}</p>
      <button class={btn} onClick={() => dec(2)} disabled={!IS_BROWSER}>
        -1
      </button>
      <button class={btn} onClick={() => inc(2)} disabled={!IS_BROWSER}>
        +1
      </button>
    </div>
  );
};

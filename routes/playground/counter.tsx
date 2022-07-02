/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "twind";
import Counter from "~islands/Counter.tsx";

export default function CounterPage() {
  return (
    <Fragment>
      <h1 class={tw`text-4xl text-center py-16`}>
        Counter
      </h1>

      <Counter start={3} />
    </Fragment>
  );
}

/** @jsx h */
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Fragment, FunctionComponent, h, JSX } from "preact";
import { tw } from "~/configs/twind.ts";

interface LazyProps {
  children: JSX.Element | JSX.Element[];
}

export const Lazy: FunctionComponent<LazyProps> = (props) => {
  if (!IS_BROWSER) {
    // show loader on the first render
    return (
      <div class={tw`flex`}>
        <div class={tw`text-center text-3xl animate-spin my-8 mx-auto`}>♻️</div>
      </div>
    );
  }

  return <Fragment>{props.children}</Fragment>;
};

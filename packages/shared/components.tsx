/** @jsx h */
import { IS_BROWSER } from "$fresh/runtime.ts";
import { Fragment, FunctionComponent, h, JSX } from "preact";
import { tw } from "~/configs/twind.ts";

export interface PropsWithChildren {
  children: JSX.Element | JSX.Element[];
}

interface LazyProps extends PropsWithChildren {
  fallback?: JSX.Element;
}

export const Lazy: FunctionComponent<LazyProps> = (
  { children, fallback = <Loader /> },
) => {
  return <Fragment>{!IS_BROWSER ? fallback : children}</Fragment>;
};

function Loader() {
  return (
    <div class={tw`flex`}>
      <div class={tw`text-center text-3xl animate-spin my-8 mx-auto`}>♻️</div>
    </div>
  );
}

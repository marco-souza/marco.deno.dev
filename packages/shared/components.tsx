import { IS_BROWSER } from "$fresh/runtime.ts";
import { FunctionComponent, JSX } from "preact";

export interface PropsWithChildren {
  children: JSX.Element | JSX.Element[];
}

interface LazyProps extends PropsWithChildren {
  fallback?: JSX.Element;
}

export const Lazy: FunctionComponent<LazyProps> = (
  { children, fallback = <Loader /> },
) => {
  return <>{!IS_BROWSER ? fallback : children}</>;
};

function Loader() {
  return (
    <div class="flex">
      <div class="text-center text-3xl animate-spin my-8 mx-auto">♻️</div>
    </div>
  );
}

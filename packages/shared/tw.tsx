import { h } from "preact";
import { Falsy } from "~/shared/types.ts";

type Class = string | Falsy | h.JSX.SignalLike<string | undefined>;

export function cls(...classes: Class[]) {
  return classes.filter(Boolean).join(" ");
}

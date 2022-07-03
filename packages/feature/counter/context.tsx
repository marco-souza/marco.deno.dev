/** @jsx h */
import { FunctionComponent, h } from "preact";
import { useMemo, useReducer } from "preact/hooks";
import { createCtx } from "@hooks";
import { Actions, createActions, reducer, State } from "./reducer.ts";

export const [useCounter, StateProvider] = createCtx<State>("CounterStateCtx");

export const [useCounterActions, ActionsProvider] = createCtx<Actions>(
  "CounterActionsCtx",
);

export const CounterProvider: FunctionComponent<State> = (
  { counter, children },
) => {
  const [store, dispatch] = useReducer(reducer, { counter });
  const actions = useMemo(() => createActions(dispatch), [dispatch]);

  return (
    <StateProvider value={store}>
      <ActionsProvider value={actions}>{children}</ActionsProvider>
    </StateProvider>
  );
};

export const withCounter = (Component: FunctionComponent, state: State) => {
  return () => (
    <CounterProvider {...state}>
      <Component />
    </CounterProvider>
  );
};

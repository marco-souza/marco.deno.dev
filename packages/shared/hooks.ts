import { createContext } from "preact";
import { useContext, useEffect, useState } from "preact/hooks";

export const createCtx = <T = undefined>(
  displayName: string,
  initialValue: T | null = null,
) => {
  const context = createContext<T | null>(initialValue);
  context.displayName = displayName;

  function useContextData() {
    const data = useContext(context);
    if (data === null) throw new Error("Context used before been initialized");
    return data;
  }

  return [useContextData, context.Provider, context] as const;
};

export type Handler<T> = (data: T) => void;

export const useExternalSync = <T>(
  subscriber: Handler<Handler<T>>,
  getSnapshot: () => T,
  initialState: T,
) => {
  const [store, setStore] = useState(initialState);

  useEffect(() => {
    subscriber(() => {
      setStore({ ...getSnapshot() });
    });
  }, []);

  return store;
};

export type KeyHandlerMap = Record<string, () => void>;

export function useKeyboardHandler(keyboardMap: KeyHandlerMap) {
  useEffect(() => {
    document.onkeydown = (event) => {
      const handler = keyboardMap[event.key];
      if (handler) handler();
    };
  }, []);
}

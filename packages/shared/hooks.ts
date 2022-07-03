import { createContext } from "preact";
import { useContext } from "preact/hooks";

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

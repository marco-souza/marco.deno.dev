import { Reducer } from "preact/hooks";

export interface State {
  counter: number;
}

interface ActionTypes {
  type: "increment" | "decrement";
}

export const initialState: State = {
  counter: 0,
};

export const reducer: Reducer<State, ActionTypes> = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        counter: state.counter + 1,
      };
    case "decrement":
      return {
        counter: state.counter - 1,
      };
  }
};

export const createActions = (dispatch: (action: ActionTypes) => void) => ({
  increment: () => dispatch({ type: "increment" }),
  decrement: () => dispatch({ type: "decrement" }),
});

export type Actions = ReturnType<typeof createActions>;

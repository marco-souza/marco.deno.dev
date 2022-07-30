import { AnyAction, createSlice } from "@reduxjs/toolkit";

export interface State {
  counter: number;
}

const initialState: State = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
  },
});

export const { actions, reducer, getInitialState } = counterSlice;

export const createActions = (dispatch: (action: AnyAction) => void) => ({
  increment: () => dispatch(actions.increment()),
  decrement: () => dispatch(actions.decrement()),
});

export type Actions = ReturnType<typeof createActions>;

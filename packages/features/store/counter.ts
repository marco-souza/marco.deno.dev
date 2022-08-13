import { makeStore, useStore } from "statery";
// import { Game, makeGame } from '~features/entities/minesweeper.ts'

interface IStore {
  counter: number;
}

const store = makeStore<IStore>({
  counter: 1,
});

export const inc = (amount = 1) =>
  store.set((state) => ({
    counter: state.counter + amount,
  }));

export const dec = (amount = 1) =>
  store.set((state) => ({
    counter: state.counter - amount,
  }));

export const state = () => useStore(store);

store.subscribe(console.log);

import { signal } from "@preact/signals";

export const counter = signal(0);

export const inc = (amount = 1) => counter.value += amount;

export const dec = (amount = 1) => counter.value -= amount;

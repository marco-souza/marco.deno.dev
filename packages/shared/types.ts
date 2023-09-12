import { JSX } from "preact/jsx-runtime";

export type WithChildren = {
  children: JSX.Element | JSX.Element[] | string;
};

export type Falsy = undefined | false | null;

export type Theme = "dark" | "light" | "system";

export type WithTheme = {
  theme: Theme;
};

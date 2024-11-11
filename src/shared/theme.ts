import type { Context } from "hono";
import { getCookie } from "hono/cookie";

export type Theme = "system" | "light" | "dark";

export const COOKIE_THEME = "selected-theme";

export function getThemeCookie(ctx: Context): Theme {
  const themeCookie = getCookie(ctx, COOKIE_THEME);

  let theme: Theme = "system";
  if (themeCookie) {
    theme = themeCookie as Theme;
  }

  return theme;
}

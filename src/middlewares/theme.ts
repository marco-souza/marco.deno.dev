import { createMiddleware } from "hono/factory";
import { COOKIE_THEME, getThemeCookie } from "~/shared/theme.ts";

export const themeMiddleware = createMiddleware(async (ctx, next) => {
  const theme = getThemeCookie(ctx);

  ctx.set(COOKIE_THEME, theme);

  await next();
});

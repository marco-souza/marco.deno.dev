import { createMiddleware } from "hono/factory";
import ErrorPage from "~/components/ErrorPage.tsx";
import { raise } from "@m3o/errors";

export const errorsMiddleware = createMiddleware(async (ctx, next) => {
  await next();

  const status = ctx.res.status;
  if (status >= 200 && status < 400) {
    return;
  }

  const title = await ctx.res.text() ?? raise("Unknown error");
  const errors = "Oops! Something went wrong. Please try again later.";

  ctx.res = await ctx.render(
    <ErrorPage code={status} title={title} description={errors} />,
  );
});

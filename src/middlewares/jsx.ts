import { createMiddleware } from "hono/factory";

export const jsxMiddleware = createMiddleware(async (ctx, next) => {
  await next();

  // sanitize html
  const sanitizedHtml = await ctx.res.text()
    .then((s) =>
      s
        .replace(/\n/g, "") // remove new lines
        .replace(/\s+/g, " ") // remove extra spaces
    );

  if (!sanitizedHtml.includes("onclick=")) return;

  // make onclick event handlers IIFE
  const parsedHtml = sanitizedHtml.replace(
    /onclick="(.*?)"/g, // avoid greedy match with `.*?`
    (_match, content) => {
      return `onclick="(${content})()" `;
    },
  );

  ctx.res = new Response(
    parsedHtml,
    ctx.res,
  );
});

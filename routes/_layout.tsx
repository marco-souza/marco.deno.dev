import { defineLayout } from "$fresh/server.ts";

export default defineLayout((_req, ctx) => {
  return <ctx.Component />;
});

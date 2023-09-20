import { defineRoute } from "$fresh/server.ts";

export default defineRoute(() => {
  return new Response("Hello world", {
    headers: { "Content-Type": "application/text" },
  });
});

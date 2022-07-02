import { HandlerContext } from "$fresh/server.ts";

export const handler = (req: Request, _ctx: HandlerContext): Response => {
  console.log(req);
  const { searchParams } = new URL(req.url);
  const body = JSON.stringify({
    text: `Hello, ${searchParams.get("name") ?? "World"}!`,
  });

  const headers = new Headers();
  headers.append("content-type", "application/json");

  return new Response(body, { headers });
};

import { HandlerContext } from "$fresh/server.ts";
import { WsMessage } from "~features/entities/ws.ts";
import { Maybe } from "~/shared/types.ts";

let intervalID: Maybe<number> = null;

export const handler = (req: Request, _ctx: HandlerContext): Response => {
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() != "websocket") {
    return new Response("request isn't trying to upgrade to websocket.");
  }
  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    socket.send(
      new WsMessage({ topic: "welcome", message: "Welcome :)" }).toString(),
    );
    console.log("socket opened");
  };
  socket.onmessage = (e) => {
    console.log("socket message:", e.data);
    socket.send(new Date().toString());
  };
  socket.onerror = (e) => console.log("socket errored:", e);
  socket.onclose = () => {
    intervalID && clearInterval(intervalID);
    console.log("socket closed");
  };

  intervalID = setInterval(
    () =>
      socket.send(
        new WsMessage({ topic: "random", message: rand().toLocaleString() })
          .toString(),
      ),
    100,
  );

  return response;
};

const rand = (upto = 1_000_000) => Math.ceil(Math.random() * upto);

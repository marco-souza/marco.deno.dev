import queue from "~/repositories/queue.ts";

const s = queue.strategyBuilder();

s.addStrategy<{ link: string }>("download-music", ({ payload }) => {
  console.log("Download music", payload.link);
});

await queue.listenMessages(s);

import queue from "~/repositories/queue.ts";

const s = queue.strategyBuilder();

s.addStrategy<{ link: string }>("download-music", ({ payload }) => {
  console.log("Download music", payload.link);
  // TODO: download music from youtube
});

await queue.listenMessages(s);

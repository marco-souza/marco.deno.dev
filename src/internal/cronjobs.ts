import { discord } from "./discord.ts";
import { giphy } from "./giphy.ts";

// INFO: Mon,Wed,Thu at 8:00 AM
Deno.cron("PodCodar - Good Morning message", "0 8 * * 1,3,4", async () => {
  try {
    const gif = await giphy.fetchRandomGif("bom dia good morning");
    await discord.sendMessageToChannel("goodMorning", gif);

    console.log("Cron job: executed", { gif });
  } catch (e) {
    if (e instanceof Error) {
      console.error("Cron job: error", { error: e });
    }
  }
});

import { discord } from "./discord.ts";
import { giphy } from "./giphy.ts";

// INFO: Every weekday at 8:30 AM (UTM-3)
Deno.cron("PodCodar - Good Morning message", "30 11 * * 1-5", async () => {
  try {
    // start up discord
    await discord.init();

    const gif = await giphy.fetchRandomGif("bom dia good morning");
    await discord.sendMessageToChannel("goodMorning", gif);

    console.log("Cron job: executed", { gif });
  } catch (e) {
    if (e instanceof Error) {
      console.error("Cron job: error", { error: e });
    }
  }
});

// INFO: check podcodar is online - every 20 minutes
Deno.cron("PodCodar - is down", "*/20 * * * *", async () => {
  try {
    const url = "https://podcodar.org";
    console.log("PodCodar - cron - checking domain");

    const res = await fetch(url);
    if (!res.ok) {
      console.error("PodCodar - is down!");

      await discord.init();
      await discord.sendMessageToChannel(
        "debug",
        `🚨 [PodCodar](${url}) is down! 🚨`,
      );

      return;
    }

    console.log("PodCodar - is up! ✅");
  } catch (e) {
    if (e instanceof Error) {
      console.error("Cron job: error", { error: e });
    }
  }
});

import { z } from "zod";
import { GiphyFetch } from "@giphy/js-fetch-api";

const Config = z.object({
  token: z.string(),
});

const config = Config.parse({
  token: Deno.env.get("GIPHY_TOKEN"),
});

const gf = new GiphyFetch(config.token);

export async function fetchRandomGif(tag: string) {
  const { data } = await gf.random({ tag });
  return data.url;
}

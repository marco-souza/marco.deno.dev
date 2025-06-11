import { z } from "zod";
import { GiphyFetch } from "@giphy/js-fetch-api";

const Config = z.object({
  token: z.string(),
});

const config = Config.parse({
  token: Deno.env.get("GIPHY_TOKEN"),
});

class GiphyClient {
  constructor(private gf: GiphyFetch) {}

  async fetchRandomGif(tag: string) {
    const { data } = await this.gf.random({ tag });
    return data.url;
  }
}

const gf = new GiphyFetch(config.token);

export const giphy = new GiphyClient(gf);

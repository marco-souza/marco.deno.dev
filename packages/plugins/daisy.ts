import { Plugin } from "$fresh/server.ts";

const DAISY_UI_CDN = "https://cdn.jsdelivr.net/npm/daisyui@3.6.4/dist/full.css";
// const TW_SCRIPT = "https://cdn.tailwindcss.com";

const minify = (content: string) =>
  content
    .replace(/\n/ig, " ")
    .replace(/\s+/ig, " ");

export async function setupDaisy() {
  const [
    daisyCSS,
    // daisyScript,
  ] = await Promise.all([
    fetch(DAISY_UI_CDN).then((r) => r.text()),
    // fetch(TW_SCRIPT).then((r) => r.text()),
  ]);

  // const main = `data:application/javascript,export default ${minify(daisyScript)}`;

  const plugin: Plugin = {
    name: "daisy-ui",
    // entrypoints: { "daisy": main },
    async renderAsync(ctx) {
      await ctx.renderAsync();
      return {
        styles: [
          { id: "daisy-ui", cssText: minify(daisyCSS) },
        ],
        scripts: [
          // { entrypoint: "daisy", state: {} },
        ],
      };
    },
  };

  return plugin;
}

import presetUno from "@unocss/preset-uno.ts";
import presetWebFonts from "@unocss/preset-web-fonts.ts";
import presetIcons from "@unocss/preset-icons.ts";
import { App } from "aleph/react";
import { serve } from "aleph/server";
import { renderToReadableStream } from "react-dom/server";

serve({
  routes: "./routes/**/*.tsx",
  build: {
    unocss: {
      presets: [
        presetWebFonts({
          fonts: {
            sans: "Roboto",
            serif: "Times New Roman",
          },
        }),
        presetUno(),
        presetIcons({ cdn: "https://esm.sh/" }),
      ],
    },
  },
  ssr: {
    suspense: false,
    render: (ctx) => renderToReadableStream(<App ssrContext={ctx} />, ctx),
  },
});

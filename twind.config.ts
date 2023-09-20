import { Options } from "$fresh/plugins/twind.ts";
import { defineConfig, Preset } from "@twind/core";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";

export default {
  ...defineConfig({
    presets: [presetTailwind() as Preset, presetAutoprefix()],
  }),
  selfURL: import.meta.url,
  darkMode: "class",
} as Options;

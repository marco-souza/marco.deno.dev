import { defineConfig } from "$fresh/server.ts";
import twindPlugin from "$fresh/plugins/twindv1.ts";
import twindConfig from "#/twind.config.ts";
import { setupDaisy } from "~/plugins/daisy.ts";

export default defineConfig({
  plugins: [
    await setupDaisy(),
    twindPlugin(twindConfig),
  ],
});

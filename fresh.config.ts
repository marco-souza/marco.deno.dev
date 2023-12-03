import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import { setupDaisy } from "~/plugins/daisy.ts";

export default defineConfig({
  plugins: [
    await setupDaisy(),
    tailwind(),
  ],
});

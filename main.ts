import "@std/dotenv/load";

import { setup } from "~/server/server.ts";

if (import.meta.main) {
  const app = await setup();

  Deno.serve(app.fetch);
}

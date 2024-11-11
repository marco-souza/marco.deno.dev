import { start } from "~/server/server.ts";

if (import.meta.main) {
  start().catch((err) => {
    console.error("E: failed to start server", err);
  });
}

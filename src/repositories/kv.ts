const DENO_KV_URL = Deno.env.get("DENO_KV_URL");

export const kv = await Deno.openKv(DENO_KV_URL);

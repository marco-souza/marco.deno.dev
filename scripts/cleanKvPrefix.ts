export async function cleanPrefixDenoKV(prefix: string, db: Deno.Kv) {
  const entries = db.list({ prefix: [prefix] });
  for await (const entry of entries) {
    console.log(entry);

    // delete
    await db.delete(entry.key);
  }
}

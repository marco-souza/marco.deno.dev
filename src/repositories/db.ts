import { Database } from "@copilotz/dengo"

export const db = new Database(await Deno.openKv())

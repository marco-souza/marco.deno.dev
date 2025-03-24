import { Database } from "@copilotz/dengo";
import { kv } from "~/repositories/kv.ts";

export const db = new Database(kv);

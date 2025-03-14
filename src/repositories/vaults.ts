import type { ObjectId, Document } from "@copilotz/dengo";
import type { VaultEntity } from "~/entities/vaults.ts";
import { db } from "~/repositories/db.ts";

export interface Vault extends Document, VaultEntity {
  _id: ObjectId;
}

export const vaults = db.collection<Vault>("vaults");

// setup index
// vaults.createIndex({
//   key: { owner: 1 },
//   options: { unique: true },
// });
//

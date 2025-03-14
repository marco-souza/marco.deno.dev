import type { Document, ObjectId } from "@copilotz/dengo";
import { db } from "~/repositories/db.ts";
import type { UserEntity } from "~/entities/users.ts";

export interface User extends Document, UserEntity {
  _id: ObjectId;
}

export const users = db.collection<User>("users");

// setup index
// users.createIndex({
//   key: { email: 1, username: 1 },
//   options: { unique: true },
// });

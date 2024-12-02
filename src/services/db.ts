import { UsersRepository } from "~/repositories/users.ts";

const kv = await Deno.openKv(Deno.env.get("DBS"));

export const db = {
  users: new UsersRepository(kv),
};

export function stop() {
  kv.close();
}

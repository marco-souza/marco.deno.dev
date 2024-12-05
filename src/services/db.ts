import { UsersRepository } from "~/repositories/users.ts";
import { VaultsRepository } from "~/repositories/vaults.ts";

const kv = await Deno.openKv(Deno.env.get("DBS"));

export const db = {
  users: new UsersRepository(kv),
  vaults: new VaultsRepository(kv),
};

export function stop() {
  kv.close();
}

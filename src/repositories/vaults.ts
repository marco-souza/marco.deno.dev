import type { Repository } from "~/repositories/types.ts";
import { defineVaultKey, type Vault, VaultSchema } from "~/entities/vaults.ts";
import { assert, raise } from "@m3o/errors";

export class VaultsRepository implements Repository<Vault> {
  constructor(private db: Deno.Kv) {}

  async create(data: Vault): Promise<Vault> {
    const validVault = VaultSchema.parse(data);

    await this.db.set(
      defineVaultKey(validVault.owner, validVault.name),
      validVault,
    );

    return validVault;
  }

  async update(id: string, data: Partial<Vault>): Promise<Vault> {
    const user = await this.db.get<Vault>(this.keys.key(id));
    if (!user?.value) {
      raise(`Vault with id ${id} not found`);
    }

    const updatedVault = VaultSchema.parse({ ...user.value, ...data });
    await this.db.set(
      defineVaultKey(updatedVault.owner, updatedVault.name),
      updatedVault,
    );

    return updatedVault;
  }

  async delete(id: string) {
    await this.db.delete(this.keys.key(id));
  }

  async find(id: string) {
    const user = await this.db.get<Vault>(this.keys.key(id));

    if (!user?.value) {
      console.warn(`Vault with id ${id} not found`);
      return null;
    }

    return user.value;
  }

  async findAll() {
    const vaults: Vault[] = [];

    for await (
      const { value } of this.db.list<Vault>({
        prefix: ["vaults"],
      })
    ) {
      vaults.push(value);
    }

    return vaults;
  }

  async findAllByOwner(owner: string) {
    const vaults: Vault[] = [];

    for await (
      const { value } of this.db.list<Vault>({
        prefix: this.keys.selector(owner),
      })
    ) {
      vaults.push(value);
    }

    return vaults;
  }

  private get keys() {
    return {
      key: (id: string) => {
        const [owner, name] = id.split(":");
        assert(Boolean(owner && name), "Invalid vault id");

        return defineVaultKey(owner, name);
      },
      selector: (owner: string) => ["vaults", owner],
    };
  }
}

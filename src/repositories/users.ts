import type { Repository } from "~/repositories/types.ts";
import { type User, UserSchema } from "~/entities/users.ts";
import { raise } from "../../packages/errors/main.ts";

export class UsersRepository implements Repository<User> {
  constructor(private db: Deno.Kv) {}

  async create(data: User): Promise<User> {
    const validUser = UserSchema.parse(data);

    await this.db.set(this.keys.key(validUser.id), validUser);

    return validUser;
  }

  async update(id: User["id"], data: Partial<User>): Promise<User> {
    const user = await this.db.get<User>(this.keys.key(id));
    if (!user?.value) {
      raise(`User with id ${id} not found`);
    }

    const updatedUser = UserSchema.parse({ ...user.value, ...data });
    await this.db.set(this.keys.key(id), updatedUser);

    return updatedUser;
  }

  async delete(id: string) {
    await this.db.delete(this.keys.key(id));
  }

  async find(id: string) {
    const user = await this.db.get<User>(this.keys.key(id));

    if (!user?.value) {
      console.warn(`User with id ${id} not found`);
      return null;
    }

    return user.value;
  }

  async findAll() {
    const users: User[] = [];

    for await (
      const { value } of this.db.list<User>({
        prefix: this.keys.selector,
      })
    ) {
      users.push(value);
    }

    return users;
  }

  genSocialId(provider: string, id: string) {
    id = `${provider}@${id}`;

    return { id, key: this.keys.key(id) };
  }

  private get keys() {
    return {
      selector: ["users"],
      key: (id: string) => ["users", id],
      sortedKey: (sorting: number | string) => ["users", "sorted", sorting],
    };
  }
}

import { z } from "zod";

export const VaultSchema = z.object({
  name: z.string(),
  owner: z.string(),
  notes: z.record(z.array(z.object({
    content: z.string(),
    last_modified: z.string(),
  }))),
});

export const defineVaultKey = (
  owner: string,
  name: string,
) => ["vaults", owner, name] as const;

export type VaultKey = ReturnType<typeof defineVaultKey>;
export type Vault = z.infer<typeof VaultSchema>;

import { z } from "zod";

export const VaultSchema = z.object({
  name: z.string(),
  owner: z.string(),
  notes: z.record(z.array(z.object({
    content: z.string(),
    last_modified: z.string(),
  }))),
});

export type VaultEntity = z.infer<typeof VaultSchema>;

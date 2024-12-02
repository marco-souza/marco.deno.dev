import { z } from "zod";

export const ROLES = ["admin", "user"] as const;

export const Role = z.enum(ROLES);

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  avatar: z.string().url(),
  role: Role,
});

export type User = z.infer<typeof UserSchema>;

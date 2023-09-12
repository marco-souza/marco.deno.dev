import { z } from "zod";
import "dotenv";

export const site = {
  name: "Marco",
  title: "Marco.labs",
  subTitle: "Code Craftsman",
  description: "Marco Labs",
  keywords: "Marco,sfotware,engineer,PodCodar,TremTec,code,craftsman",
  repository: "https://github.com/marco-souza/marco.deno.dev",
};

const VarEnvSchema = z.object({});

// validate if var envs are processed
export const env = VarEnvSchema.parse(Deno.env.toObject());

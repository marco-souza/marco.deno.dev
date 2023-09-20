import { z } from "zod";
import "dotenv";

export const site = {
  name: "Marco",
  title: "Marco.labs",
  subTitle: "Code Craftsman",
  description: "Marco Labs",
  keywords: "Marco,sfotware,engineer,PodCodar,TremTec,code,craftsman",
  repository: "https://github.com/marco-souza/",

  links: {
    stackoverflow: "https://stackoverflow.com/users/7988674/marco-antônio/",
    linkedin: "https://www.linkedin.com/in/masouzajunior",
    github: "https://github.com/marco-souza",
    podcodar: "https://podcodar.com/",
    paradigm: "https://paradigm.co/",
    tremtec: "https://tremtec.com/",
  },

  cta: {
    primary: {
      text: "Let's have a Coffee ☕️",
      link:
        "mailto:marco@tremtec.com?subject=Hi Marco, let's have a coffee!",
    },
    secondary: { text: "Resume", link: "/resume" },
  },
};

const VarEnvSchema = z.object({
  GITHUB_PROFILE: z.string().trim().min(1),
});

// validate if var envs are processed
export const settings = VarEnvSchema.parse(Deno.env.toObject());

export async function generateTailwindTokens() {
  const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") ?? true;

  const allEnvs = Deno.env.toObject();

  console.info("I: Environment variables:");
  console.info(allEnvs);

  if (isDenoDeploy) {
    console.info("I: Skipping Tailwind tokens generation on Deno Deploy");
    return;
  }

  const twCommand = new Deno.Command("deno", {
    args: ["task", "tw-tokens"],
  });

  const cmdOutput = await twCommand.output();
  if (cmdOutput.code !== 0) {
    console.error("E: Tailwind tokens generation failed");
    console.error(new TextDecoder().decode(cmdOutput.stderr));
    Deno.exit(1);
  }

  console.info("I: Tailwind tokens generated");
}

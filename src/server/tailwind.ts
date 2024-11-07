export async function generateTailwindTokens() {
  const twInputPath = "./static/css/styles.css";
  const twOutputPath = "./static/css/styles.min.css";
  const twCommand = new Deno.Command("deno", {
    args: [
      "run",
      "-A",
      "npm:tailwindcss",
      "-i",
      twInputPath,
      "-o",
      twOutputPath,
    ],
  });

  const cmdOutput = await twCommand.output();
  if (cmdOutput.code !== 0) {
    console.error("E: Tailwind tokens generation failed");
    console.error(new TextDecoder().decode(cmdOutput.stderr));
    Deno.exit(1);
  }

  console.info("I: Tailwind tokens generated");
}

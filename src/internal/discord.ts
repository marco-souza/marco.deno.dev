import {
  Client,
  Events,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  TextChannel,
} from "discord.js";
import { z } from "zod";

const Config = z.object({
  token: z.string(),
  appId: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
});

const config = Config.parse({
  token: Deno.env.get("DISCORD_BOT_TOKEN"),
  appId: Deno.env.get("DISCORD_APP_ID"),
  clientId: Deno.env.get("DISCORD_CLIENT_ID"),
  clientSecret: Deno.env.get("DISCORD_CLIENT_SECRET"),
});

const channelIdMap = {
  goodMorning: "1338883336084521053",
  debug: "1243281325780107444",
} as const;

// Function to send a message to a specific channel
export async function sendMessageToChannel(
  channelName: keyof typeof channelIdMap,
  message: string,
): Promise<void> {
  const channelId = channelIdMap[channelName];

  // get channel
  let channel = client.channels.cache.get(channelId) ?? null;
  if (!channel) {
    channel = await client.channels.fetch(channelId);
  }

  if (!channel) {
    throw new Error(`Channel with ID ${channelId} not found.`);
  }

  if (!(channel instanceof TextChannel)) {
    throw new Error(`Channel with ID ${channelId} is not a text channel.`);
  }

  await channel.send(message);
}

async function registerCommands() {
  const commands = [
    { name: "ping", description: "Replies with Pong!" },
    { name: "pong", description: "Replies with Ping!" },
  ];

  console.log("Started refreshing application (/) commands.");

  const rest = new REST({ version: "10" }).setToken(config.token);
  await rest.put(Routes.applicationCommands(config.clientId), {
    body: commands,
  });

  console.log("Successfully reloaded application (/) commands.");
}

function registerEventHandlers() {
  client.on(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag}!`);
  });

  client.on(Events.MessageCreate, async (message) => {
    // Ignore messages from the bot itself
    if (message.author.bot) return;

    // Simple conversational responses
    if (message.content.toLowerCase().includes("hello")) {
      await message.reply("Hi there! How can I assist you today?");
      return;
    }

    if (message.content.toLowerCase().includes("bye")) {
      await message.reply("Goodbye! Have a great day!");
      return;
    }

    await message.reply(
      "Sorry, I didn't quite get that. Can you please rephrase?",
    );
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    console.log(Events.InteractionCreate);
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "pong") {
      await interaction.reply("Ping!");
    }

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.User, Partials.Channel, Partials.Message],
});

await registerCommands();

registerEventHandlers();

await client.login(config.token);

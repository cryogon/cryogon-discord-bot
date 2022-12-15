import "dotenv/config";

import { ButtonStyle, Client, GatewayIntentBits } from "discord.js";
import { ButtonBuilder } from "@discordjs/builders";

const btn = new ButtonBuilder()
  .setCustomId("test")
  .setLabel("Surprise")
  .setStyle(ButtonStyle.Primary);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});
client.login(process.env.DISCORD_TOKEN);
client.on("messageCreate", async (msg) => {
  console.log(msg);
  if (!msg.author.bot) {
    msg.author.send({
      content: "Hey There! Click Here To Get Surprise",
      components: [btn],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "test") {
    await interaction.reply({
      content: "WTF! Lemme Sleep Dude",
      ephemeral: true,
    });
  }
});

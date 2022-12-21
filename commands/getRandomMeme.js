import { SlashCommandBuilder } from "discord.js";
import fetch from "node-fetch";

export const data = new SlashCommandBuilder()
  .setName("reddit")
  .setDescription("Get random post from reddit")
  .addStringOption((option) => {
    return option
      .setName("subreddit")
      .setDescription("Select Subreddit to get post from (default /dankmemes)")
      .setMinLength(2)
      .setMaxLength(25);
  });

export async function execute(interaction) {
  const option = await interaction.options.get("subreddit");
  const r = `${option?.value || "dankmemes"}`;
  console.log(r);
  const apiUrl = `https://meme-api.com/gimme/${r}`;
  const post = await fetch(apiUrl).then((m) => m.json());
  await interaction.reply({
    content: `r/${r}
nsfw:${post?.nsfw}`,
    files: [post?.url],
  });
}

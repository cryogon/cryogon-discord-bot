import { EmbedBuilder } from "discord.js";
export function getWinStreak(message,data) {
    const username = Object.keys(data).filter((k) =>
      k.includes(message.author.username)
    )[0];
    if (username) {
      const embed = new EmbedBuilder()
        .setTitle("Win Streak Leaderboard")
        .setColor(0x69c3ed)
        .addFields(
          { name: "**user**", value: `\`${username}\``, inline: true },
          {
            name: "**win_streak**",
            value: `${data[username].win_streak}`,
            inline: true,
          },
          {
            name: "**highest_streak**",
            value: `${data[username].highest_streak}`,
            inline: true,
          }
        );
  
      message.reply({
        embeds: [embed],
      });
    } else {
      message.reply({
        content: `User does not have any records yet`,
      });
    }
  }
  
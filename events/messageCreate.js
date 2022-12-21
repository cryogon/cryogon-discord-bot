import { Events} from "discord.js";
import { getWinStreak,getCommandList } from "../misc/index.js";
import fs from "node:fs";
const data = JSON.parse(fs.readFileSync("./score.json", "utf-8"));
export const name = Events.MessageCreate;
export async function execute(message) {
  if (!message.author.bot && message.content == "!hi") {
    message.reply({
      content: `Hii there! How was your Day ${message.author}`,
    });
  }
  if (message.content == "!r") {
    getWinStreak(message,data);
  }
  if(message.content == "!cmd"){
    getCommandList(message);
  }
}

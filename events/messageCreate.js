import { Events } from 'discord.js';
import fs from "node:fs";
const data = JSON.parse(fs.readFileSync("./score.json","utf-8"));
export const name = Events.MessageCreate;
export async function execute(message) {
	if (!message.author.bot && message.content == 'hi bot!') {
		message.reply({
			content:`Hii there! How was your Day ${message.author}`,
		});
	}
	if (message.content == '!r') {
		message.reply({
			content:JSON.stringify(data)
		});
	}

}
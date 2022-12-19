import { Events } from 'discord.js';
import fs from 'node:fs';
export const name = Events.MessageCreate;
export async function execute(message) {
	if (!message.author.bot && message.content == 'hi bot!') {
		message.reply({
			content:`Hii there! How was your Day ${message.author}`,
		});
	}
	if (message.author.id == '745120737064648704' && message.attachments) {
		message.delete()
			.then(msg => {
				console.log(`Deleted message from ${msg.author.username}`);

				if (fs.existsSync('./logs.txt')) {
					fs.appendFileSync('logs.txt', `\nDeleted message from ${msg.author.username}`);
				}
				else {fs.writeFileSync('logs.txt', `Deleted message from ${msg.author.username}`);}
			});
	}
}
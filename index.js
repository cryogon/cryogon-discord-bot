import 'dotenv/config';
import { Client, Collection } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';

// Create a new client instance
const client = new Client({
	intents: [
		'Guilds',
		'GuildMessages',
		'MessageContent',
		'GuildMembers',
	] });


client.commands = new Collection();

const commandPath = path.resolve('./', 'commands');
const commandFiles = fs.readdirSync(commandPath).filter((c) => c.endsWith('.js'));

const eventsPath = './events';
const eventFiles = fs.readdirSync(eventsPath).filter(e => e.endsWith('.js'));
(async () => {

	for (const file of commandFiles) {
		const filePath = './' + path.relative('.', path.join(commandPath, file));
		const command = await import(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}

	}
	for (const file of eventFiles) {
		const filePath = './' + path.join(eventsPath, file);
		const event = await import(filePath);

		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}
})();

client.login(process.env.DISCORD_TOKEN);

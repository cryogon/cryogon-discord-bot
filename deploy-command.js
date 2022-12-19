import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import { readdirSync } from 'node:fs';

let commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
(async function() {
	for (const file of commandFiles) {
		const command = await import(`./commands/${file}`);
		// commands.push(command.data.toJSON());
		commands = [...commands, command.data.toJSON()];
	}

	// Deploying Commands

	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}
)();

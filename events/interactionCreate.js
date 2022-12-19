import { Events } from 'discord.js';

export const name = Events.InteractionCreate;
export async function execute(interaction) {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No matching command ${interaction.commandName} was found`);
		return;
	}

	try {
		await command.execute(interaction);

	}
	catch (err) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(err);
	}
}

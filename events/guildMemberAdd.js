import { Events } from 'discord.js';
export const name = Events.GuildMemberAdd;
export async function execute(member) {
	member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID).send(`<@${member.id}> Welcome to the server!`);
}
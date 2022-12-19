import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';


export const data = new SlashCommandBuilder().setName('rps').setDescription('Rock Paper Scissor')
	.addStringOption(option => {
		return option.setName('action').setDescription('Choose between rock,paper or scissor')
			.setChoices({ name: 'rock', value: 'rock' }, { name: 'paper', value: 'paper' }, { name: 'scissor', value: 'scissor' })
			.setRequired(true);
	});

const rockBtn = new ButtonBuilder().setLabel('Rock').setCustomId('rockBtn').setStyle(ButtonStyle.Primary);
const paperBtn = new ButtonBuilder().setLabel('Paper').setCustomId('paperBtn').setStyle(ButtonStyle.Primary);
const scissorBtn = new ButtonBuilder().setLabel('Scissor').setCustomId('scissorBtn').setStyle(ButtonStyle.Primary);


async function PvC(option, interaction) {
	const allowedChoice = ['rock', 'paper', 'scissor'];
	const comChoice = allowedChoice[Math.round(Math.random() * allowedChoice.length)];
	let result;
	if (comChoice === option.value) {
		result = 'Draw';
	}
	else if (comChoice === 'paper' && option.value == 'rock') {
		result = 'You Lost';
	}
	else if (comChoice === 'paper' && option.value == 'scissor') {
		result = 'You Won';
	}
	else if (comChoice === 'rock' && option.value == 'scissor') {
		result = 'You Lost';
	}
	else if (comChoice === 'rock' && option.value == 'paper') {
		result = 'You Won';
	}
	else if (comChoice === 'scissor' && option.value == 'rock') {
		result = 'You Won';

	}
	else if (comChoice === 'scissor' && option.value == 'paper') {
		result = 'You Lost';
	}
	await interaction.reply({
		content:`bot choose ${comChoice}, ${result}`,
	});

}
export async function execute(interaction) {

	const option = interaction.options.get('action');
	const row = new ActionRowBuilder().addComponents([rockBtn, paperBtn, scissorBtn]);
	let result;
	const collector = interaction.channel.createMessageComponentCollector({ row, time: 15000, max:1 });

	collector.on('collect', (i) => {
		if (i.customId === 'rockBtn') {
			if (option.value != 'rock') {

				if (option.value === 'paper') {
					result = `<@${interaction.user.id}>'s ${option.value} destroyed <@${i.user.id}>'s rock`;
				}
				else {
					result = `<@${i.user.id}>'s rock destroyed <@${interaction.user.id}>'s ${option.value}`;
				}
			}
			else {
				result = `It seems <@${i.user.id}> is par with <@${interaction.user.id}?'s. Its a draw`;
			}
		} if (i.customId === 'paperBtn') {
			if (option.value != 'paper') {

				if (option.value === 'scissor') {
					result = `<@${interaction.user.id}>'s ${option.value} destroyed <@${i.user.id}>'s paper`;
				}
				else {
					result = `<@${i.user.id}>'s paper destroyed <@${interaction.user.id}>'s ${option.value}`;
				}
			}
			else {
				result = `It seems <@${i.user.id}> is par with <@${interaction.user.id}>'s. Its a draw`;
			}
		} if (i.customId === 'scissorBtn') {
			if (option.value != 'scissor') {

				if (option.value === 'rock') {
					result = `<@${interaction.user.id}>'s ${option.value} destroyed <@${i.user.id}>'s scissor`;
				}
				else {
					result = `<@${i.user.id}>'s scissor destroyed <@${interaction.user.id}>'s ${option.value}`;
				}
			}
			else {
				result = `It seems <@${i.user.id}> is par with <@${interaction.user.id}>'s. Its a draw`;
			}
		}
		i.reply(`${result}`);
	});
	await interaction.reply({
		content:'Choose',
		components:[row],
	});
	console.log(rockBtn.data);
}


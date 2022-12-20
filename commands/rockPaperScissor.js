import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

import fs from 'node:fs';
import path from "node:path";
const scorePath = path.resolve("./score.json");
const rawData = fs.readFileSync(scorePath,"utf-8");
const score = JSON.parse(rawData);

const winHistory = score || {};


function updateScore(uWon, uLost) {
	let currWinStreak = score[uWon.user.username]?.win_streak;
	let currHighestStreak = score[uWon.user.username]?.highest_streak;
	winHistory[uWon.user.username] = {
		win_streak: currWinStreak ? currWinStreak+1 : 1,
		highest_streak: currHighestStreak ? (currHighestStreak<currWinStreak+1)?currWinStreak+1:currHighestStreak:1
	}
	winHistory[uLost.user.username] = {
		win_streak: 0,
		highest_streak: score[uLost.user.username]?.highest_streak
	};
	fs.writeFileSync("./score.json",JSON.stringify(winHistory));
	console.log(winHistory);
}






export const data = new SlashCommandBuilder().setName('rps').setDescription('Rock, Paper,& Scissor with another user')
	.addStringOption(option => {
		return option.setName('action').setDescription('Choose between rock,paper or scissor')
			.setChoices({ name: 'rock', value: 'rock' }, { name: 'paper', value: 'paper' }, { name: 'scissor', value: 'scissor' })
			.setRequired(true);
	});

const rockBtn = new ButtonBuilder().setLabel('Rock').setCustomId('rockBtn').setStyle(ButtonStyle.Primary);
const paperBtn = new ButtonBuilder().setLabel('Paper').setCustomId('paperBtn').setStyle(ButtonStyle.Primary);
const scissorBtn = new ButtonBuilder().setLabel('Scissor').setCustomId('scissorBtn').setStyle(ButtonStyle.Primary);


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
					updateScore(interaction, i);
				}
				else {
					result = `<@${i.user.id}>'s rock destroyed <@${interaction.user.id}>'s ${option.value}`;
					updateScore(i, interaction);
				}
			}
			else {
				result = `It seems <@${i.user.id}> is par with <@${interaction.user.id}>'s. Its a draw`;
			}
		} if (i.customId === 'paperBtn') {
			if (option.value != 'paper') {

				if (option.value === 'scissor') {
					result = `<@${interaction.user.id}>'s ${option.value} destroyed <@${i.user.id}>'s paper`;
					updateScore(interaction, i);
				}
				else {
					result = `<@${i.user.id}>'s paper destroyed <@${interaction.user.id}>'s ${option.value}`;
					updateScore(i, interaction);
				}
			}
			else {
				result = `It seems <@${i.user.id}> is par with <@${interaction.user.id}>'s. Its a draw`;
			}
		} if (i.customId === 'scissorBtn') {
			if (option.value != 'scissor') {

				if (option.value === 'rock') {
					result = `<@${interaction.user.id}>'s ${option.value} destroyed <@${i.user.id}>'s scissor`;
					updateScore(interaction, i);
				}
				else {
					result = `<@${i.user.id}>'s scissor destroyed <@${interaction.user.id}>'s ${option.value}`;
					updateScore(i, interaction);
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
console.log(winHistory);
}


import { EmbedBuilder } from "discord.js";

export function getCommandList(message){
    const embd = new EmbedBuilder()
    .setColor(0xff1010)
    .setTitle("Command List")
    .setDescription("List of commands that are currently available")
    .setFields(
        {name:"*Slash Commands*",value:`\`rps\`,\`ping\`,\`user\`,\`server\`,\`reddit\``},
        {name:"*Normal Commands*",value:`\`!r\`,\`!hi\`,\`!cmd\``}
    )
    .setFooter({text:"more comming soon...."});
    message.reply({
        embeds:[embd]
    })
}
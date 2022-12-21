import { EmbedBuilder } from "discord.js";

const fields = [
  {
    name: "*Slash Commands*",
    value: `\`rps\`,\`ping\`,\`user\`,\`server\`,\`reddit\``,
  },
  { name: "*Normal Commands*", value: `\`!r\`,\`!hi\`,\`!help\`` },
];

export function getCommandList(message) {
  const msgChunks = message.content.split(" ");
  if (msgChunks.length == 1) {
    const embd = new EmbedBuilder()
      .setColor(0xff1010)
      .setTitle("Command List")
      .setDescription(
        "List of commands that are currently available. `!help <command>` for additional details"
      )
      .setFields(...fields)
      .setFooter({ text: "more comming soon...." });
    message.reply({
      embeds: [embd],
    });
  } else {
    getSpecificCommandDetail(message, msgChunks);
  }
}

const commands = {
  rps: {
    description: "Challange other user for Rock, Paper & Scissor Game",
    example: "/rps `<rock|paper|scissor>`",
  },
  "!r": {
    description: "show users win streak",
    example: "`!r`",
  },
  "!hi": {
    description: "greets user back",
    example: "`!hi`",
  },
  ping: {
    description: "replies with Pong!",
    example: "/ping",
  },
  server: {
    description: "check the server detail",
    example: "/server",
  },
  user: {
    description: "check the user detail",
    example: "/user",
  },
  reddit: {
    description:
      "return's a random post from reddit. user can choose subreddit(optional). default is set to dankmemes",
    example: "/reddit `[null|<subreddit>]`",
  },
};

export function getSpecificCommandDetail(message, msgChunks) {
  const cmd = msgChunks[1];
  if(commands[cmd])
    message.reply({ embeds: [msgTemplate(commands[cmd].description, cmd)] });
    else
    message.reply(`no command called "${cmd}" found!`);
}

function msgTemplate(desc, cmd) {
  return new EmbedBuilder()
    .setColor(0x69ff69)
    .setTitle(`${cmd}`)
    .setDescription(desc)
    .setFields({ name: "Command Example", value: `${commands[cmd].example}` });
}

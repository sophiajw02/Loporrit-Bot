require('dotenv').config();

const {Client, 
    IntentsBitField, 
    ActivityType
} = require('discord.js');
const { searchFFLogs } = require('./fflog');

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const PREFIX = '!';

const fflogModule = require('./fflog.js');
const itemSearchModule = require('./itemsearch.js');
const universalisModule = require('./universalis.js');

const statuses = [
    {
        name: 'for pudding...', 
        type: ActivityType.Watching
    }, {
        name: 'with pudding...',
        type: ActivityType.Playing
    }, {
        name: 'pudding...',
        type: ActivityType.Listening
    }
];

const updateStatus = () => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status.name, {type: status.type});
};

client.on('ready', (c) => {
    console.log(`Bot "${client.user.tag}" is online!`);
    updateStatus();
    setInterval(updateStatus, 60000);
})

client.on('interactionCreate', async (interaction) => {
    try {
        if (!interaction.isButton()) return;
        await interaction.deferReply({ ephemeral: true });
  
        const role = interaction.guild.roles.cache.get(interaction.customId);
        if (!role) {
            interaction.editReply({
            content: "Role could not be found. Please contact a server administrator.",
        });
        return;
        }
  
        const hasRole = interaction.member.roles.cache.has(role.id);
        if (hasRole) {
            await interaction.member.roles.remove(role);
            await interaction.editReply(`The role ${role} has been removed.`);
            return;
        }
        
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role} has been added.`);

    } catch (error) {
      console.log(error);
    }
  });

// Event listener: Bot receives a message
client.on('messageCreate', (message) => {
  if (message.author.bot) return; // Ignore messages from other bots
  if (!message.content.startsWith(PREFIX)) return; // Ignore messages that don't start with the prefix

  const [command, ...args] = message.content.slice(1).trim().split(' ');

  if (command === 'fflogSearch' || command === 'fflogsearch' || command === 'fflogs') {
    fflogModule.searchFFLogs(message, args);
  } else if (command === 'universalisSearch' || command === 'universalissearch' || command === 'universalis') {
    universalisModule.marketBoardSearch(message, args);
  } else if (command === 'itemSearch' || command === 'itemsearch' || command === 'item') {
    itemSearchModule.searchItem(message, args);
  }



});

// Log in to Discord using the bot token
client.login(process.env.TOKEN);


require('dotenv').config(); // Load environment variables from .env file

const { 
    Client, 
    IntentsBitField 
} = require('discord.js');

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

// Import other modules
const rolesModule = require('./roles.js');
// const fflogModule = require('./fflog.js');
// const itemSearchModule = require('./itemsearch.js');
// const universalisModule = require('./universalis.js');
// const eventsModule = require('./events.js');


const botToken = process.env.TOKEN;
// Add other API keys or configurations as needed

// Bot ready event
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  // You can perform any necessary initialization tasks here
});

// Bot message event
client.on('messageCreate', async (message) => {
  // Check if the message is from a bot or doesn't start with the bot's prefix
  if (message.author.bot || !message.content.startsWith('!')) return;

  // Extract the command and arguments from the message
  const [command, ...args] = message.content.slice(1).trim().split(' ');

  // Handle different commands
  if (command === 'assignRole') {
    rolesModule.assignRole(message, args);
//   } else if (command === 'fflogSearch') {
//     fflogModule.searchUser(message, args);
//   } else if (command === 'itemSearch') {
//     itemSearchModule.searchItem(message, args);
//   } else if (command === 'universalisSearch') {
//     universalisModule.searchMarketBoard(message, args);
//   } else if (command === 'createEvent') {
//     eventsModule.createEvent(message, args);
//   } else if (command === 'editEvent') {
//     eventsModule.editEvent(message, args);
//   } else if (command === 'deleteEvent') {
//     eventsModule.deleteEvent(message, args);
  } else {
    // Unknown command, handle appropriately
    message.channel.send('Unknown command');
  }
});

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

// Log in the bot using the token
client.login(process.env.TOKEN);

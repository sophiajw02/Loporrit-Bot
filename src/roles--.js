const { MessageActionRow, MessageButton } = require('discord.js');

function assignRole(client) {
    const guildId = process.env.GUILD_ID; 
    const channelId = process.env.ROLE_CHANNEL_ID; 

  // Fetch the guild and channel objects
  const guild = client.guilds.cache.get(guildId);
  const channel = client.channels.cache.get(channelId);

  // Create the action row with buttons
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId('button1')
      .setLabel('Role 1')
      .setStyle('PRIMARY'),
    new MessageButton()
      .setCustomId('button2')
      .setLabel('Role 2')
      .setStyle('PRIMARY')
  );

  // Send the message with buttons in the specified channel
  channel.send('Click a button to add or remove a role!', { components: [row] })
    .then((sentMessage) => {
      // Add a collector to listen for button interactions
      const collector = sentMessage.createMessageComponentCollector({ time: 15000 });

      // Handle button interactions
      collector.on('collect', (interaction) => {
        const memberId = interaction.user.id;
        const member = guild.members.cache.get(memberId);

        if (interaction.customId === 'button1') {
          const roleId = 'ROLE_1_ID'; // Replace with the role ID for Role 1

          if (member.roles.cache.has(roleId)) {
            member.roles.remove(roleId)
              .then(() => {
                interaction.reply('Role 1 removed.');
              })
              .catch((error) => {
                console.error(error);
                interaction.reply('Failed to remove Role 1.');
              });
          } else {
            member.roles.add(roleId)
              .then(() => {
                interaction.reply('Role 1 added.');
              })
              .catch((error) => {
                console.error(error);
                interaction.reply('Failed to add Role 1.');
              });
          }
        } else if (interaction.customId === 'button2') {
          const roleId = 'ROLE_2_ID'; // Replace with the role ID for Role 2

          if (member.roles.cache.has(roleId)) {
            member.roles.remove(roleId)
              .then(() => {
                interaction.reply('Role 2 removed.');
              })
              .catch((error) => {
                console.error(error);
                interaction.reply('Failed to remove Role 2.');
              });
          } else {
            member.roles.add(roleId)
              .then(() => {
                interaction.reply('Role 2 added.');
              })
              .catch((error) => {
                console.error(error);
                interaction.reply('Failed to add Role 2.');
              });
          }
        }
      });

      // Handle collector expiration
      collector.on('end', (collected) => {
        if (collected.size === 0) {
          sentMessage.edit('Role assignment request timed out.', {
            components: [],
          });
        }
      });
    })
    .catch((error) => {
      console.error(error);
      console.log('Failed to send the message with buttons.');
    });
}

module.exports = {
  assignRole,
};

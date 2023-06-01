const { MessageEmbed } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

const site = 'https://xivapi.com';

async function searchItem(message, args) {
  const itemName = args.join(' ');

  // Check if an item name was provided
  if (!itemName) {
    message.channel.send('Please provide an item name.');
    return;
  }

  try {
    // Perform the search using the XIVAPI
    const response = await axios.get(`https://xivapi.com/search`, {
      params: {
        string: itemName,
        indexes: 'item',
      },
    });
    const data = response.data;

    // Check if any results were found
    if (!data.Results || data.Results.length === 0) {
        const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('No items found for the specified search query.');
    
        message.channel.send({ embeds: [embed] });
        return;
    }

    // Prepare the embed message to display the search results
    const description = await axios.get(site + data.Results[0].Url);
    const descData = description.data;

    console.log(descData);

    const embed = new EmbedBuilder();

    if (String(descData.ItemUICategory.Name) == 'Shield' ||
        String(descData.ItemUICategory.Name) == 'Gladiator\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Marauder\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Dark Knight\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Gunbreaker\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Lancer\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Reaper\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Pugulist\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Samurai\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Rogue\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Archer\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Machinist\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Dancer\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'One-handed Thaumaturge\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Two-handed Thaumaturge\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Arcanist\'s Grimoire' ||
        String(descData.ItemUICategory.Name) == 'Red Mage\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Blue Mage\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'One-handed Conjurer\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Two-handed Conjurer\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Scholar\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Astrologian\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Sage\'s Arm' ||
        String(descData.ItemUICategory.Name) == 'Carpenter\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Carpenter\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Blacksmith\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Blacksmith\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Armorer\'s Primary Tool' || 
        String(descData.ItemUICategory.Name) == 'Armorer\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Goldsmith\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Goldsmith\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Leatherworker\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Leatherworker\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Weaver\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Weaver\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Alchemist\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Alchemist\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Culinarian\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Culinarian\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Miner\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Miner\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Botanist\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Botanist\'s Secondary Tool' ||
        String(descData.ItemUICategory.Name) == 'Fisher\'s Primary Tool' ||
        String(descData.ItemUICategory.Name) == 'Fisher\'s Secondary Tool') {
          embed.setColor(0x0099ff)
            .setTitle(data.Results[0].Name)
	          .setAuthor({ name: 'XIVAPI', iconURL: 'https://xivapi.com/c/PlaceName.png'})
            .setThumbnail(site + data.Results[0].Icon)
            .setDescription(descData.ClassJobCategory.Name + '\n' + descData.ItemUICategory.Name)
            .addFields({name: 'Equip Level', value: String(descData.LevelEquip), inline: true},
              {name: 'Item Level', value: String(descData.LevelItem), inline: true},
              {name: '\u200B', value: '\u200B'},
              {name: 'Patch Release', value: String(descData.GamePatch.Name), inline: false}
            );
    } else if (String(descData.ItemUICategory.Name) == 'Head' ||
        String(descData.ItemUICategory.Name) == 'Body' ||
        String(descData.ItemUICategory.Name) == 'Hands' ||
        String(descData.ItemUICategory.Name) == 'Legs' ||
        String(descData.ItemUICategory.Name) == 'Feet') {
          embed.setColor(0x0099ff)
          .setTitle(data.Results[0].Name)
          .setAuthor({ name: 'XIVAPI', iconURL: 'https://xivapi.com/c/PlaceName.png'})
          .setThumbnail(site + data.Results[0].Icon)
          .setDescription(descData.ClassJobCategory.Name + '\n' + descData.ItemUICategory.Name)
          .addFields({name: 'Equip Level', value: String(descData.LevelEquip), inline: true},
            {name: 'Item Level', value: String(descData.LevelItem), inline: true},
            {name: '\u200B', value: '\u200B'},
            {name: 'Patch Release', value: String(descData.GamePatch.Name), inline: false}
      );
    } else {
        embed.setColor(0x0099ff)
          .setTitle(data.Results[0].Name)
	        .setAuthor({ name: 'XIVAPI', iconURL: 'https://xivapi.com/c/PlaceName.png'})
          .setThumbnail(site + data.Results[0].Icon)
          .setDescription(descData.Description)
          .addFields(
            {name: 'Item Category', value: String(descData.ItemUICategory.Name), inline: true},
            {name: '\u200B', value: '\u200B'},
            {name: 'Patch Release', value: String(descData.GamePatch.Name), inline: true}
          );
    }

    // Send the embed message with the search results
    message.channel.send({ embeds: [embed] });
  } catch (error) {
    console.error(error);

    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('An error occurred while searching for items. Please try again later.');
    
    message.channel.send({ embeds: [embed] });
  }
}

async function translateItemNameToID(itemName) {
  try {
    // Perform the search using the XIVAPI
    const response = await axios.get(`https://xivapi.com/search?string=`, {
      params: {
        string: itemName,
        indexes: 'item',
      },
    });

    const data = response.data;
    console.log(data);
    console.log(data.Results[0].ID);

    // Check if any results were found
    if (!data.Results || data.Results.length === 0) {
      return null;
    }

    // Return the ID of the first item
    return data.Results[0].ID;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  searchItem,
  translateItemNameToID,
};

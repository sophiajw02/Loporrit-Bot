const { MessageEmbed } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

async function marketBoardSearch(message, args) {
  const dataCenter = args[0];
  const itemName = args.slice(1).join(' ');

  // Check if both data center and item name were provided
  if (!dataCenter || !itemName) {
    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('Please provide a valid data center and item name.');
    
    message.channel.send({ embeds: [embed] });
    return;
  }

  try {
    // Perform the search using the Universalis API to retrieve worlds in the data center
    const response = await axios.get(`https://universalis.app/api/v2/data-centers`);
    const data = response.data;
    var DCdata = null;
    for (i = 0; i < data.length; i++) {
      // console.log(data[i].name.toLowerCase());
      // console.log(dataCenter.toLowerCase());
      // console.log(String(data[i].name).toLowerCase() == dataCenter.toLowerCase());
      if (String(data[i].name).toLowerCase() == dataCenter.toLowerCase()) {
        console.log("found");
        console.log(data[i]);
        DCdata = data[i];
      }
    }
    
    //const itemId = itemSearchModule.translateItemNameToID(itemName);
    console.log("error catch line 44");

    // Check if any worlds were found for the specified data center
    if (!DCdata.worlds || DCdata.worlds.length === 0) {
      const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('No worlds found for the specified data center. Please input a valid data center.');
    
      message.channel.send({ embeds: [embed] });
      return;
    }

    // Prepare the embed message to display the market board data
    const embed = new EmbedBuilder()
      .setTitle('Universalis Market Board Data')
      .setDescription(`Data Center: ${dataCenter}\nItem Name: ${itemName}`);

    // Iterate through the worlds in the data center and fetch market board data for each world
    for (i = 0; i < DCdata.worlds.length; i++) {


    }



    for (const world of data.worlds) {
      try {
        const response = await axios.get(`https://universalis.app/api/${dataCenter}/${world}?item=${encodeURIComponent(itemName)}`);

        const worldData = response.data;

        // Check if any listings were found for the specified item in the world
        if (!worldData.listings || worldData.listings.length === 0) {
          continue;
        }

        // Add a field for each listing in the world
        let listingsField = '';
        worldData.listings.forEach((listing) => {
          listingsField += `Listing ID: ${listing.listingID}\nPrice: ${listing.price.toLocaleString()} gil\n\n`;
        });

        embed.addField(`World: ${world}`, listingsField);
      } catch (error) {
            console.log("error catch 2");
        //console.error(error);
      }
    }

    // Send the embed message with the market board data
    message.channel.send(embed);
  } catch (error) {
    console.error(error);
    console.log("error catch 86");

    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('An error occurred while searching Universalis. Please try again later.');
    
    message.channel.send({ embeds: [embed] });
  }
}

module.exports = {
  marketBoardSearch,
};

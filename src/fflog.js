const { MessageEmbed } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const axios = require('axios');

async function searchFFLogs(message, args) {
  const apiKey = process.env.FFLOGS_CLIENT_ID // Replace with your FFLogs API key
  const query = args.join(' ');

  // Check if a query was provided
  if (!query) {
    message.channel.send('Please provide a search query.');
    return;
  }

  console.log(query);

  try {
    // Perform the search using the FFLogs API
    const response = await axios.get(`https://www.fflogs.com/v1/parses/search`, {
      params: {
        api_key: apiKey,
        q: query,
      },
    });

    const data = response.data;

    // Check if any results were found
    if (data.length === 0) {
        const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('No results found for search:\n' + String(query));
    
        message.channel.send({ embeds: [embed] });
        return;
    }

    // Prepare the embed message to display the search results
    const embed = new MessageEmbed()
      .setTitle('FFLogs Search Results')
      .setDescription(`Search query: ${query}`);

    // Add a field for each result
    data.forEach((result) => {
      embed.addField(result.characterName, result.server);
    });

    // Send the embed message with the search results
    message.channel.send(embed);
  } catch (error) {
    //console.error(error);
    console.log(query);

    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('Error')
        .setDescription('No results found for search:\n' + String(query));
    
    message.channel.send({ embeds: [embed] });
  }
}

module.exports = {
  searchFFLogs,
};

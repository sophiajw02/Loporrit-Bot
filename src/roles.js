require('dotenv').config();

const {Client, 
    IntentsBitField, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle
} = require('discord.js');

const client = new Client({
    intents: [IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1111745620600950854',
        label: 'Pudding Lover'
    }, {
        id: '1111791196604481607',
        label: 'Pudding Hater'
    }
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get(process.env.ROLE_CHANNEL_ID)
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({
            content: 'Click the button to add or remove a role!',
            components: [row]
        });

        process.exit(0);
    } catch (e) {
        console.log(e);
    }
});

client.login(process.env.TOKEN);
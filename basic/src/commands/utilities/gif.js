const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('testgif')
    .setDescription('Sends a random gif!')
    .addStringOption(option =>
        option.setName('category')
            .setDescription('The gif category')
            .setRequired(true)
            .addChoices(
                { name: 'Funny', value: 'gif_funny' },
                { name: 'Meme', value: 'gif_meme' },
                { name: 'Movie', value: 'gif_movie' },
            ));

module.exports = {
    data,
    async execute(interaction) {
        const category = interaction.options.getString('category');
        const url = `https://g.tenor.com/v1/random?q=${category}&key=${process.env.TENORKEY}&limit=1`;
        const response = await fetch(url);
        const gif = (await response.json()).results[0].url;
        await interaction.reply(gif);
    },
};

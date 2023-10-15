const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping")
        .setDMPermission(false),
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async execute(interaction){
        interaction.reply("Pong")
    }
}
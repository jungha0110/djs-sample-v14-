const { Events } = require("discord.js")
const { appendFile } = require("fs");
const { join } = require("path");

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    /**
     * 
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (exception) {
            const randomCode = require("../function/RandomCode")(6)

            interaction.reply({
                content: `알 수 없는 오류가 발생했습니다 \n오류코드 [${randomCode}]`,
                ephemeral: true
            })

            appendFile(
                join('./logs', `error-${randomCode}.log`), 
                exception.stack + '\n', 
                (error) => {
                    if (error) console.error(error)
                }
            )
        }
    }
}
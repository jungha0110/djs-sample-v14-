const { Client, Collection, REST, Routes, Options } = require("discord.js")
const { readdirSync } = require("fs")
const { join } = require("path")
require("dotenv").config();

class Main extends Client {
    constructor() {
        super({
            intents: [131071],
        });
    }

    async commands_load() {
        this.commands = new Collection();
        const commnads_push = [];
        readdirSync(join(__dirname, "Commands")).forEach((dirs) => {
            const commands = readdirSync(join(__dirname, `Commands/${dirs}`))
                .filter((files) => files.endsWith(".js"))
            for (const file of commands) {
                const command = require(join(__dirname, `Commands/${dirs}/${file}`))
                command.category = dirs;
                this.commands.set(command.data.name, command);
                commnads_push.push(command.data.toJSON());
                delete require.cache[require.resolve(join(__dirname, `Commands/${dirs}/${file}`))]
            }
        });
        const rest = new REST({ version: "10" })
            .setToken(process.env.TOKEN);
        try {
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: commnads_push,
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    events_load() {
        const event_files = readdirSync(join(__dirname, `Event`))
            .filter((file) => file.endsWith(".js"))
        for (const file of event_files) {
            const event = require((0, join)(__dirname, `Event/${file}`))
            if (event) {
                if (event.once == true) {
                    this.once(event.name, (...args) => event.run(...args));
                }
                else {
                    this.on(event.name, (...args) => event.run(...args));
                }
                delete require.cache[require.resolve((0, join)(__dirname, `Event/${file}`))];
            }
        }
    }

    async start() {
        await this.login(process.env.TOKEN);
        this.commands_load();
        this.events_load();
    }
}

process.on("uncaughtException", exception => {
    console.log(exception);
})

exports.default = new Main().start();
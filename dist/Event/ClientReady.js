const { Events, ActivityType, Status } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    /**
     * 
     * @param {import("discord.js").Client} client
     */
    async run(client) {
        console.log(`Ready ${client.user.tag}`);
        
        const setPresence = () => {
            setInterval(() => {
                const statuses = [
                    "TEST",
                    "WA"
                ]

                const status = Math.floor(Math.random() * statuses.length)

                client.user.setPresence({
                    activities: [{
                        name: statuses[status],
                        type: ActivityType.Playing
                    }],
                    status: Status.Idle
                })
            }, 10 * 1000)
        }

        setPresence()

        setTimeout(() => {
            setPresence()
        }, 1000 * 60 * 60)
    }
}
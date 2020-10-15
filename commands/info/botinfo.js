const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class BotInfos extends Command {
    constructor (client) {
        super(client, {
            name: "botinfos",
            enabled: true,
            aliases: [ "stats", "infos" ],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message, args, data) {

        let guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        let guildsCount = guildsCounts.reduce((p, count) => p + count);
        let channelsCounts = await this.client.shard.fetchClientValues("channels.cache.size");
        let channelsCount = channelsCounts.reduce((p, count) => p + count);
        let usersCounts = await this.client.shard.fetchClientValues("users.cache.size");
        let usersCount = usersCounts.reduce((p, count) => p + count);
        
        let results = await this.client.shard.broadcastEval(() => {
            return [
                Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
                this.guilds.cache.size,
                this.channels.cache.size,
                this.shard.ids[0],
                Math.round(this.ws.ping)
            ];
        });

        let embed = new Discord.MessageEmbed()
        .setColor(data.color)
        .setFooter(data.footer)
        .setAuthor(message.language.botinfos.author(this.client.user.username))
        .addField(message.language.botinfos.statistics.title(), message.language.botinfos.statistics.content(guildsCount, channelsCount, usersCount) , true)
        .addField(message.language.botinfos.versions.title(), message.language.botinfos.versions.content(Discord.version, process.version), true)
        results.forEach((shard) => {
            let title = message.language.botinfos.shard.title(shard[2]+1, this.client.shard.ids.includes(shard[2]), true);
            embed.addField(title, message.language.botinfos.shard.content(shard[1], shard[3], shard[0]));
        });

        message.channel.send(embed);
    }

};

module.exports = BotInfos;
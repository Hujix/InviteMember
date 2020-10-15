const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Partners extends Command {
    constructor (client) {
        super(client, {
            name: "creators",
            enabled: true,
            aliases: [],
            clientPermissions: [ "EMBED_LINKS" ],
            permLevel: 0
        });
    }

    async run (message, args, data) {
        
        const creators = require("../../creators.json");
        let partner = creators[Math.floor(Math.random() * creators.length)];

        let embed = new Discord.MessageEmbed()
        .setTitle(partner.title)
        .setURL(partner.url)
        .setThumbnail(partner.img)
        .setDescription(partner.text)
        .setFooter(data.footer)
        .setColor(data.color);

        message.channel.send(embed);
    }

};

module.exports = Partners;
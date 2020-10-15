const Discord = require("discord.js");

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (guild) {

        let inviter = null;

        // Wait 2 seconds to be sure that a request have been sent to the dashboard
        await this.client.wait(2000);
        let knownGuild = this.client.knownGuilds.find((g) => g.id === guild.id);
        if(knownGuild){
            inviter = await this.client.users.fetch(knownGuild.user);
        } else {
            inviter = await this.client.users.fetch(guild.ownerID);
        }

        const guildDelete = JSON.stringify(new Discord.MessageEmbed()
        .setTitle("`-` InviteMember a quitté un serveur")
        .addField("• <:nom:747577853045899406> **Nom:**", guild.name) 
        .addField("• <:couronne:747577851821293640> **Propriétaire:** ", guild.owner.user.tag)
        .addField("• <:ID:747577852379136080> **ID du serveur:** ", guild.id)
        .addField("• <:membres:747577853142630451> **Membres:** ", guild.memberCount)
        .setColor("d90e0b")).replace(/[\/\(\)\']/g, "\\$&");

        let { removeLogs } = this.client.config;
        this.client.shard.broadcastEval(`
            let rLogs = this.channels.cache.get('${removeLogs}');
            if(rLogs) rLogs.send({ embed: JSON.parse('${guildDelete}')});
        `);
        
    }
};




      

      

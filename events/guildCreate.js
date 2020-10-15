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

        let guildData = await this.client.guildsData.findOne({ id: guild.id });
        let welcomeMessage = guildData ?
        `Mon préfixe est \`${guildData.prefix}\`. Si vous souhaitez supprimer les invitations du serveur à recommencer à zéro, vous pouvez utiliser \`${guildData.prefix}remove-invites\`. Si vous souhaitez synchroniser les invitations actuelles du serveur avec le bot, vous pouvez utiliser \`${guildData.prefix}sync-invites\`\n \n**--------------**\n`
        : "Mon préfixe est `+`. Si vous souhaitez supprimer les invitations du serveur à recommencer à zéro, vous pouvez utiliser `+remove-invites`.\n \n**--------------**\n";            

        const guildCreate = JSON.stringify(new Discord.MessageEmbed()
        .setTitle("`➕` InviteMember a rejoint un serveur")
        .addField("• <:nom:747577853045899406> **Nom:**", guild.name) 
        .addField("• <:couronne:747577851821293640> **Propriétaire:** ", guild.owner.user.tag)
        .addField("• <:ID:747577852379136080> **ID du serveur:** ", guild.id)
        .addField("• <:membres:747577853142630451> **Membres:** ", guild.memberCount)
        .setColor("1fd10f")).replace(/[\/\(\)\']/g, "\\$&");

        let { addLogs } = this.client.config;
        this.client.shard.broadcastEval(`
            let aLogs = this.channels.cache.get('${addLogs}');
            if(aLogs) aLogs.send({ embed: JSON.parse('${guildCreate}')});
        `);

        let joinEmbed = new Discord.MessageEmbed()
        .setTitle("Vous avez ajouté InviteMember | :heart:")
        .setDescription(`Salut **${inviter.username}**! Merci de m'avoir ajouté à votre serveur !\n\n **--------------** `)
        .addField("__**INFORMATIONS**__", welcomeMessage)
        .addField("__**AIDES**__", "Si vous avez besoin d'aide, rejoignez le serveur de support!\n \n**--------------**\n")
        .addField("__**LIENS**__", `> Ajouter le bot [[Cliquez ici]](https://discordapp.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=2146958847&scope=bot)\n> Serveur support  [[Cliquez ici]](${this.client.config.discord})\n> SiteWeb  [[Cliquez ici]](https://invitemember.delta-bot.com/home)`)
        .setFooter(this.client.config.footer)
        .setTimestamp()
        .setColor(this.client.config.color)
    
        inviter.send(joinEmbed);

        await this.client.wait(5000);
        let client = this.client;
        let guildInvites = await guild.fetchInvites();
        if(!guildInvites) return;
        let users = new Set(guildInvites.map((i) => i.inviter.id));
        await this.client.functions.asyncForEach(Array.from(users), async (user) => {
            let memberData = await client.findOrCreateGuildMember({ id: user, guildID: guild.id });
            memberData.invites = guildInvites.filter((i) => i.inviter.id === user).map((i) => i.uses).reduce((p, c) => p + c);
            await memberData.save();
        });
    }
};
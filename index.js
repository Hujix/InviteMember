const util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");
Discord = require("discord.js");

// Load ManageInvite class
const ManageInvite = require("./structures/Client"),
client = new ManageInvite();

const init = async () => {

    // Search for all commands
    let directories = await readdir("./commands/");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
    
    client.login(client.config.token); // Log in to the discord api

    // connect to mongoose database
    mongoose.connect(client.config.mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => {
        client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
    });

    // Gets commands permission
    client.levelCache = {};
    for (let i = 0; i < client.permLevels.length; i++) {
      const thisLevel = client.permLevels[parseInt(i, 10)];
      client.levelCache[thisLevel.name] = thisLevel.level;
    }

};
init();
    client.on("guildCreate", async guild => {
  
        let canal = client.channels.cache.get("747575944176468060")
        
             const embed = new Discord.MessageEmbed()
            .setThumbnail(guild.iconURL)
            .setTitle("`➕` InviteMember a rejoint un serveur")
            .setDescription("__Informations du serveur :__\n• <:nom:747577853045899406> **Nom:** "+ guild.name +"\n• <:region:747577853050093618> **Region:** " +guild.region +"\n• <:roles:747577853129916537> **Rôles:** "+guild.roles.cache.size+"\n• <:membres:747577853142630451> **Membres:** "+guild.memberCount+"\n• <:ID:747577852379136080> **ID:** "+guild.id+"\n• <:couronne:747577851821293640> **Propriétaire:** "+ guild.owner.user.tag +"")
            .setTimestamp()
            .setColor("1fd10f")
            .setFooter("InviteMember | Crée par DeltaBot Inc.");
        
            canal.send({ embed });
        });

    client.on('guildDelete', (guild) => {

        let canal = client.channels.cache.get("747575944176468060")

        const embed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL)
        .setTitle("`➖` InviteMember a quitté un serveur")
        .setDescription("__Informations du serveur :__\n• <:nom:747577853045899406> **Nom:** "+ guild.name +"\n• <:region:747577853050093618> **Region:** " +guild.region +"\n• <:roles:747577853129916537> **Rôles:** "+guild.roles.cache.size+"\n• <:membres:747577853142630451> **Membres:** "+guild.memberCount+"\n• <:ID:747577852379136080> **ID:** "+guild.id+"\n• <:couronne:747577851821293640> **Propriétaire:** "+ guild.owner.user.tag +"")
        .setTimestamp()
        .setColor("d90e0b")
        .setFooter("InviteMember | Crée par DeltaBot Inc.");
    
      canal.send({ embed });
               
       })

// if there are errors, log them
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.log(e, "error"))
    .on("warn", (info) => client.logger.log(info, "warn"));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    console.error(err);
});
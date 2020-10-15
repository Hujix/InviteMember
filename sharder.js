const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
    token: require("./config").token,
    totalShards: 3,
    shardArgs: process.argv
});

console.log("Salut, "+require("os").userInfo().username+". Merci d'utiliser InviteMember.");
manager.spawn();
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", {
    token: require("./config").token,
    totalShards: 2,
    shardArgs: process.argv
});

console.log("Merhaba, "+require("os").userInfo().username+". İnviteModerator Kullandığınız İçin Teşekkür Ederiz.");
manager.spawn();
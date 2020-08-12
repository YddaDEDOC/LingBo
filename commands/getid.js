const { Message } = require("discord.js")

module.exports = {
    name: 'getid',
    description: "this is a g command!",
    execute(msg, args){
        msg.channel.send(msg.author.id);

    }
}
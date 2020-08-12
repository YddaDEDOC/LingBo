const { Message } = require("discord.js")

module.exports = {
    name: 'game',
    description: "Starting game!",
    execute(msg, args){

        msg.channel.send('Starting game with ' + pOne.name + ' as player 1!');

    }
}
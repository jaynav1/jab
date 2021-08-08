const fetch = require("node-fetch")
const Discord = require ('discord.js')

module.exports = {
	name: 'cases',
	description: 'predict, set, and show leaderboard',
	execute(client, receivedMessage, arguments) {
        if (arguments[0] == 'predict') {
            var prediction = parseInt(arguments[1])
            if (isNaN(prediction)) {
                receivedMessage.channel.send(`please input a number`)
            } else {
                receivedMessage.channel.send(`you predicted ${prediction} cases`)
            }
        } else if (arguments[0] == 'set') {
            var today = parseInt(arguments[1])
            if (isNaN(today)) {
                receivedMessage.channel.send(`please input a number`)
            } else {
                receivedMessage.channel.send(`there are ${today} new cases today`)
            }
        } else {
            const casesEmbed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setTitle('Cases game leaderboard')
            
            receivedMessage.channel.send(casesEmbed)
        }
        
	}
}
const fetch = require("node-fetch")
const Discord = require ('discord.js')
const db = require('quick.db');
var moment = require('moment');

module.exports = {
	name: 'cases',
	description: 'predict, set, and show leaderboard',
	execute(client, receivedMessage, arguments) {
        if (arguments[0] == 'predict') {
            var prediction = parseInt(arguments[1])
            if (isNaN(prediction)) {
                receivedMessage.channel.send(`please input a number`)
            } else {
                var datetomorrow  = moment().add(1,'days').format('D-M-YYYY')
                receivedMessage.channel.send(`you predicted ${prediction} cases for ${datetomorrow}`)
                senderid = receivedMessage.author.id
                db.set(`players.${senderid}`, { datetomorrow : prediction })
            }
        } else if (arguments[0] == 'set') {
            var todaycases = parseInt(arguments[1])
            if (isNaN(todaycases)) {
                receivedMessage.channel.send(`please input a number`)
            } else {
                var datetoday = moment().format('D-M-YYYY')
                receivedMessage.channel.send(`there are ${todaycases} new cases today ${datetoday}`)
                db.set('cases', { datetoday : todaycases })
            }
        } else {
            const casesEmbed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setTitle('Cases game leaderboard')
            
            receivedMessage.channel.send(casesEmbed)
        }
        
	}
}
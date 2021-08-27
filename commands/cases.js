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
                //receivedMessage.channel.send(`you predicted ${prediction} cases for ${datetomorrow}`)
                receivedMessage.react('👍')
                senderid = receivedMessage.author.id
                db.set(`predict_${senderid}.${datetomorrow}`, prediction)
            }
        } else if (arguments[0] == 'set' && receivedMessage.author.id == '309632128386072586') {
            var todaycases = parseInt(arguments[1])
            if (isNaN(todaycases)) {
                receivedMessage.channel.send(`please input a number`)
            } else {
                var datetoday = moment().format('D-M-YYYY')
                //receivedMessage.channel.send(`there are ${todaycases} new cases today ${datetoday}`)
                receivedMessage.react('👍')
                db.set(`cases.${datetoday}`, todaycases)
                receivedMessage.guild.members.cache.forEach(member => {
                    if (db.has(`predict_${member.id}`)) {
                        var offby = Math.abs(db.get(`predict_${member.id}.${datetoday}`)-db.get(`cases.${datetoday}`))
                        db.add(`score_${member.id}`, offby)
                        if (offby == 0) {
                            db.add(`perfect_${member.id}`, 1)
                        }
                    }
                })
            }
        } else {
            const score = db.all().filter(data => data.ID.startsWith(`score`)).sort((a, b) => a.data - b.data);
            var finalLbscore = ''
            for (var i in score) finalLbscore += `\`${score.indexOf(score[i])+1}-\` <@${score[i].ID.split('_')[1]}> - ${score[i].data} Perfect: ${db.get(`perfect_${score[i].ID.split('_')[1]}`)}\n`
            const casesEmbed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setTitle('Cases game leaderboard (lower score is better)')
                .setDescription(finalLbscore)
            receivedMessage.channel.send(casesEmbed)
        }
	}
}
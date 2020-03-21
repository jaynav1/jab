const fetch = require('node-fetch')
const Discord = require('discord.js')

module.exports = {
	name: 'xkcd',
	description: 'look at xkcd comics',
	execute(client, receivedMessage, comicnumber) {
		if (/^\d+$/.test(comicnumber)) {
            fetch("https://xkcd.com/" + comicnumber + "/info.0.json")
                .then(res => res.json())
                .then(data => obj = data)
                .then(() => {
                    console.log(obj)
                    XkcdEmbed = new Discord.MessageEmbed()
                        .setAuthor(("xkcd #" + obj.num + " | " + obj.safe_title), "https://avatars.githubusercontent.com/u/428146?v=3", "https://xkcd.com/" + obj.num )
                        .setImage(obj.img)
                        .setColor(0xDCDCDC)
                        .setFooter(obj.alt + " | " + obj.day + "/" + obj.month + "/" + obj.year)
                        .setURL("https://xkcd.com/" + obj.num)
                    receivedMessage.channel.send(XkcdEmbed)})
                .catch(() => receivedMessage.channel.send("invalid number, please try again"))
        } else {
            fetch("https://xkcd.com/info.0.json")
                .then(res => res.json())
                .then(data => obj = data)
                .then(() => {
                    XkcdEmbed = new Discord.RichEmbed()
                        .setAuthor(("xkcd #" + obj.num + " | " + obj.safe_title), "https://avatars.githubusercontent.com/u/428146?v=3", "https://xkcd.com/" + obj.num )
                        .setImage(obj.img)
                        .setColor(0xDCDCDC)
                        .setFooter(obj.alt + " | " + obj.day + "/" + obj.month + "/" + obj.year)
                        .setURL("https://xkcd.com/" + obj.num)
                    receivedMessage.channel.send(XkcdEmbed)
                })
        }
	}
}
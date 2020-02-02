const Discord = require ('discord.js')
const webhook = require("webhook-discord")
const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/643015490762964993/ApI2-sTQ5tKJTS6MHmwu9SD-uBJNJ6YSdu38KklInvaKb4t0rU_RqdLUtQegyt-ihqeD")

module.exports = {
	name: 'hook',
	description: 'impersonate users on server',
	execute(client, receivedMessage, arguments) {
        console.log(arguments)
        var [user, ...text] = arguments
        taggedUser = receivedMessage.mentions.users.first()
        console.log(text)
        var message = text.join(" ")
        console.log(taggedUser)
        const msg = new webhook.MessageBuilder()
                .setName(taggedUser.username)
                .setText(message)
                .setAvatar(taggedUser.avatarURL)
        Hook.send(msg);
        receivedMessage.channel.send("Webhook sent!")
	}
}
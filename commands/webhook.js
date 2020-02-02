const Discord = require ('discord.js')
const webhook = require("webhook-discord")
const Hook = new webhook.Webhook("https://discordapp.com/api/webhooks/643015490762964993/ApI2-sTQ5tKJTS6MHmwu9SD-uBJNJ6YSdu38KklInvaKb4t0rU_RqdLUtQegyt-ihqeD")

module.exports = {
	name: 'hook',
	description: 'impersonate users on server',
	execute(client, receivedMessage, arguments) {
        var user,text = arguments
        console.log(client.users.get(user))
        
        const msg = new webhook.MessageBuilder()
                .setName('hello')
                .setText('hello')
        Hook.send(msg);
        receivedMessage.channel.send("Webhook sent!")
	}
}
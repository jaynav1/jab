const fetch = require("node-fetch")
const Discord = require ('discord.js')

module.exports = {
	name: 'qrcode',
	description: 'generate qr code',
	execute(client, receivedMessage, arguments) {
        fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${arguments}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                receivedMessage.channel.send(response.url)
            })
        
	}
}
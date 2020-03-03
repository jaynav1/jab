const fetch = require("node-fetch")
const Discord = require ('discord.js')

module.exports = {
	name: 'qrcode',
	description: 'generate qr code',
	execute(client, receivedMessage, arguments) {
        fetch(`http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${arguments}.png`)
            .then(response => response.blob())
            .then(response => {
                console.log(response)
                receivedMessage.channel.send("here is your qrcode", {files: [`http://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${arguments}`]})
            })
        
	}
}
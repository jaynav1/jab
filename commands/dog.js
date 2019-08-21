const fetch = require("node-fetch")
const Discord = require ('discord.js')

module.exports = {
	name: 'dog',
	description: 'dog pic',
	execute(client, receivedMessage, arguments) {
        fetch('https://random.dog/woof.json')
            .then(response => response.json())
            .then(response => {
                console.log(response)
                receivedMessage.channel.send(response.url)
            })
        
	}
}
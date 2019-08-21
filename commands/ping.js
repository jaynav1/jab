module.exports = {
	name: 'ping',
	description: 'client ping',
	execute(client, receivedMessage, arguments) {
		receivedMessage.channel.send("Ping is " + client.ping + "ms")
	}
}


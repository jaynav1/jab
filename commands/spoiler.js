module.exports = {
    name: 'spoiler',
    description: 'troll spoiler',
    execute(client, receivedMessage, arguments) {
        var message = arguments.join(" ") 
        message = message.split("")
        for (var i in message) {
            message[i] = "||" + message[i] + "||"
          }
        message = message.join("")
        receivedMessage.channel.send("```" + message + "```")
    }
}
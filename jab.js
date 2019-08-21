const fs = require('fs')
const Discord = require('discord.js')
const Parser = require('rss-parser')
const fetch = require('node-fetch')
const { prefix, token } = require('./config.json')


const parser = new Parser()
const client = new Discord.Client()
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


//_________________________________Connect_____________________________
client.on('ready', () => {
  console.log("Connected as " + client.user.tag)
})
//_________________________________Status_______________________________
client.on('ready', () => {
  // Set bot status to: "Playing with JavaScript"
  client.user.setActivity("the void", {type: "LISTENING"})

  // Alternatively, you can set the activity to any of the following:
  // PLAYING, STREAMING, LISTENING, WATCHING
  // For example:
  // client.user.setActivity("TV", {type: "WATCHING"})
})

//____________________________________Prefix________________________________________
client.on('message', (receivedMessage) => {
    if (!receivedMessage.content.startsWith(prefix) || receivedMessage.author.bot) return
    processCommand(receivedMessage)
})


//___________________________________Find Arg_______________________________________
function processCommand(receivedMessage) {
    let fullString = receivedMessage.content.slice(prefix.length) // Remove the j!
    let splitCommand = fullString.split(" ") // Split the message up in to pieces for each space
    let commandName = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + commandName)
    console.log("Arguments: " + arguments) // There may not be any arguments

        if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

	try {
        console.log(`trying ${commandName}`)
        command.execute(client, receivedMessage, arguments)
	} catch (error) {
		console.error(error)
		receivedMessage.channel.send('there was an error trying to execute that command. Please check for spelling errors or try again later.')
    }
    
}

//______________________________________Run______________________________
client.login(token) // Replace XXXXX with your bot token
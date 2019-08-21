const Discord = require ('discord.js')
const WolframAlphaAPI = require('wolfram-alpha-api')
const waApi = WolframAlphaAPI('YWU7YQ-28GGQQH6V8')

module.exports = {
	name: 'ask',
	description: 'get results from wolfram',
	execute(client, receivedMessage, arguments) {
		arguments = arguments.join('+')
		waApi.
        
	}
}
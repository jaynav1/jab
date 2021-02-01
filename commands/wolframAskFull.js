const Discord = require ('discord.js')
const WolframAlphaAPI = require('wolfram-alpha-api')
const { prefix, token, WAkey } = require('../config.json')
const waApi = WolframAlphaAPI(WAkey)



module.exports = {
	name: 'fask',
	description: 'get results from wolfram',
	execute(client, receivedMessage, arguments) {
		arguments = arguments.join(' ')
		data = []
		waApi.getFull({input: arguments, output: "json"})
			.then((queryresult) => {
				console.log(queryresult)




			}).catch(console.error)
		
	}
}
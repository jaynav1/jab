const fetch = require("node-fetch")
const Discord = require ('discord.js')

module.exports = {
	name: 'ask',
	description: 'get results from wolfram',
	execute(client, receivedMessage, arguments) {
        arguments = arguments.join('%20')
        fetch(`http://api.wolframalpha.com/v1/result?appid=DEMO&i=How+far+is+Los+Angeles+from+New+York%3f`, { method: 'GET', headers: headers})
            .then(res => console.log(res))
	}
}
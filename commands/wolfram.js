const wolframkey = 'YWU7YQ-28GGQQH6V8'
const fetch = require('node-fetch')
const parser = require('xml2js')

module.exports = {
	name: 'wolfram',
	description: 'ooooh api',
	execute(client, receivedMessage, arguments) {
		arguments = arguments.join('+')
		fetch(`https://www.wolframalpha.com/queryrecognizer/query.jsp?&appid=YWU7YQ-28GGQQH6V8&mode=Default&i=${arguments}`)
			.then(response => response.text())
			.then(response => parser.parseString(response, function (err, result) {
				console.log(result)
			}))
			.then(response => console.log(response))
	}
}
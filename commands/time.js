const fetch = require('node-fetch')
const timeApiURL = "https://dev.virtualearth.net/REST/v1/TimeZone/query=" 
const timeApiKey = "?key=AiUAb5xnBKX5pvhCfMUP13LIx2Vg8rB-0qxc22UsSLxlfdTdnG6Z0hHHk9XvzW2u"

module.exports = {
	name: 'time',
	description: 'tell the time',
	execute(client, receivedMessage, arguments) {
        location = arguments.join("+")
        if (location == 'map') {
            message = "http://alien-homepage.de/weather_start/current_site_template_%20expl_english/weathersite%20general%20template/images/timezones/gif/large_images/all/timezones_text.jpg"
        } else {
            location = location.toString()
    
            fetch(timeApiURL + location +timeApiKey)
                .then(res => res.json())
                .then(data => obj = data)
                .then(() => {
                    console.log(obj.resourceSets[0].resources[0])
                    var timeLoc = obj.resourceSets[0].resources[0].timeZoneAtLocation[0].placeName
                    var timeStr = obj.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0].convertedTime.localTime.slice(11) 
                    receivedMessage.channel.send("The time in " + timeLoc + " is " + timeStr)
                })
                .catch(() => receivedMessage.channel.send("Sorry, I couldn't find that place. Please check for any errors or try a location near it."))
        }
	}
}
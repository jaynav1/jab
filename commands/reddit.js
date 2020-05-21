const fetch = require('node-fetch')
const Discord = require('discord.js')



module.exports = {
	name: 'reddit',
	description: 'look at the subreddits',
	execute(client, receivedMessage, subreddit) {
		let pages = []
        let page = 1
        
        fetch(`https://api.reddit.com/r/${subreddit}/hot.json?sort=hot&limit=25`)
            .then(response => response.json())
            .then(response => {
                console.log(response.data.children)
                response.data.children.forEach (function(post) {
                    pages.push(post.data)
                })
                console.log(pages)
                console.log(pages[0])
                const redEmbed = new Discord.MessageEmbed()
                    .setColor(0xffffff)
                    .setFooter(`${pages[page - 1].score} upvotes | Submitted by u/${pages[page - 1].author} | Post ${page} of ${pages.length}`)
                    .setTitle(pages[page - 1].title)
                    .setDescription(pages[page - 1].selftext)
                    .setImage(pages[page - 1].url)
                    .setURL(`https://reddit.com${pages[page - 1].permalink}`)

                
                
                receivedMessage.channel.send(redEmbed).then(msg => {
                    
                    msg.react('◀').then( r => {
                        msg.react('▶')

                        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === receivedMessage.author.id
                        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === receivedMessage.author.id
                        const backwards = msg.createReactionCollector(backwardsFilter, {time: 60000})
                        const forwards = msg.createReactionCollector(forwardsFilter, {time: 60000})

                        function update() {
                            redEmbed.setFooter(`${pages[page - 1].score} upvotes | Submitted by u/${pages[page - 1].author} | Post ${page} of ${pages.length}`)
                            redEmbed.setTitle(pages[page - 1].title)
                            redEmbed.setDescription(pages[page - 1].selftext)
                            redEmbed.setImage(pages[page - 1].url)
                            redEmbed.setURL(`https://reddit.com${pages[page - 1].permalink}`)
                            msg.edit(redEmbed)
                        }

                        backwards.on('collect', r => {
                            if (page === 1) {
                                r.remove(r.users.filter(u => u === receivedMessage.author).first())
                                return
                            }
                            page--
                            update()
                            //r.remove(r.users.filter(u => u === receivedMessage.author).first())
                        })
                        
                        forwards.on('collect', r => {
                            if (page === pages.length) {
                                r.remove(r.users.filter(u => u === receivedMessage.author).first())
                                return
                            }
                            page++
                            update()
                            //r.remove(r.users.filter(u => u === receivedMessage.author).first())
                        })
                    })
                })
            })
    }
}

/*
*/

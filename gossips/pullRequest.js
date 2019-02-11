const regexPattern = /https:\/\/github\.com\/[\w|-]+\/[\w|-]+\/pull\/\d+/

const gotKickedAnswers = [
  {
    "attachments": [
        {
            "text": "One human less, many to go",
            "image_url": "https://media.giphy.com/media/10Sa8k39ZFtufu/giphy.gif"
        }
    ]
  }
]

const publicChannelAnswers = [
  {
    "attachments": [
        {
            "text": "No PRs... allowed... in this channel...",
            "image_url": "https://gifimage.net/wp-content/uploads/2017/09/alien-mouth-gif-12.gif"
        }
    ]
  }
]

exports.exec = async ({web, event, db}) => {
  const channel = event.channel
  const channelConfig = await db.retrieveConfig(channel) 
  if (!channelConfig.allowsPRs) {
    let answer
    if (event.channel_type === 'group') {
      web.groups.kick({ user: event.user, channel }).catch(console.error);
      answer = gotKickedAnswers[Math.floor(Math.random() * gotKickedAnswers.length)]
    } else {
      answer = publicChannelAnswers[Math.floor(Math.random() * publicChannelAnswers.length)]
    }
    web.chat.postMessage({ attachments: answer.attachments, channel: event.channel }).catch(console.error);
  }
}

exports.testRegex = (text) => {
  const result = regexPattern.test(text)
  regexPattern.lastIndex = 0
  return result
}
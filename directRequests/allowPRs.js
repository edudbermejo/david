const noPRsMessage = `As you please. From now on anyone posting PRs in this channel will be ~terminated~ removed.`
const yesPRsMessage = `As you command. We will allow PRs in this channel from now on.`

const regexPattern = /allow PRs/gi

exports.exec = async ({web, event, db}) => {
  const notAllowRegex = /([won't]|[do not]|[don't]) allow PRs/gi
  const channel = event.channel
  const channelConfig = await db.retrieveConfig(channel) 
  if (notAllowRegex.test(event.text)) {
    if (channelConfig.allowsPRs) {
      channelConfig.allowsPRs = false
      db.persistConfig(channelConfig)
    }
    web.chat.postMessage({ text: noPRsMessage, channel }).catch(console.error);
  } else {
    if (!channelConfig.allowsPRs) {
      channelConfig.allowsPRs = true
      db.persistConfig(channelConfig)
    }
    web.chat.postMessage({ text: yesPRsMessage, channel }).catch(console.error);
  }
}

exports.testRegex = (text) => {
  const result = regexPattern.test(text)
  regexPattern.lastIndex = 0
  return result
}
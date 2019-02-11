const helpMessage = `
Hi! How can I be of service?
`

const regexPattern = /.*/gi

exports.exec = async ({web, event}) => {
  web.chat.postMessage({ text: helpMessage, channel: event.channel }).catch(console.error);
}

exports.testRegex = (text) => {
  const result = regexPattern.test(text)
  regexPattern.lastIndex = 0
  return result
}
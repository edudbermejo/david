const helpMessage = `
Hi! How can I be on service?
`

const regexPattern = /.*/gi

exports.exec = ({web, event}) => {
  web.chat.postMessage({ text: helpMessage, channel: event.channel }).catch(console.error);
}

exports.testRegex = (text) => {
  const result = regexPattern.test(text)
  regexPattern.lastIndex = 0
  return result
}
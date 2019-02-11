const helpMessage = `
Hi! How can I be on service?
`

const regexPattern = /^david$/i

exports.exec = ({web, channel}) => {
  web.chat.postMessage({ text: helpMessage, channel }).catch(console.error);
}

exports.testRegex = (text) => {
  const result = regexPattern.test(text)
  regexPattern.lastIndex = 0
  return result
}
const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/client')
const express = require('express')
const bodyParser = require('body-parser')

const { directRequests } = require('./directRequests')

const app = express()
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const web = new WebClient(process.env.SLACK_ACCESS_TOKEN)
const port = process.env.PORT || 3000


// Listen to events for showing help when mentioned ( @ )
app.use('/commands/*', bodyParser.urlencoded({ extended: false }))
app.use('/slack/events', slackEvents.expressMiddleware())

slackEvents.on('app_mention', (event) => { // TODO seems not to be working, worth taking a look
  console.log(event)
  emptyRequest(web, event.channel)
})

slackEvents.on('message', (event) => {
  directRequests.forEach(directRequest => {
    if (directRequest.testRegex(event.text)) {
      directRequest.exec({web, channel: event.channel})
    }
  })
})

app.listen(port, () => console.log(`Server listening on port ${port}`))

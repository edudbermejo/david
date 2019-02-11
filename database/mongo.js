const mongoose = require('mongoose')
const { MONGODB_USER, MONGODB_PASSWORD }  = process.env
const { channelConfigSchema } = require('./schemas/channelConfig')

mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds331135.mlab.com:31135/wayland`, { useNewUrlParser: true }) 
const ChannelConfig = mongoose.model('ChannelConfig', channelConfigSchema)

const retrieveConfig = async (channelId) => {
  let value = await ChannelConfig.findOne({name: channelId}).exec()
  if (!value) {
    value = new ChannelConfig({name: channelId, allowsPRs: true})
    ChannelConfig.create(value)
  }
  return value
}

const persistConfig = (channelConfig) => {
  ChannelConfig.findOneAndUpdate({name: channelConfig.name}, channelConfig).exec()
}

exports.db = {
  retrieveConfig,
  persistConfig
}
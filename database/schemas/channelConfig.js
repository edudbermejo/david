const { Schema } = require('mongoose')

exports.channelConfigSchema = new Schema({
  name:  String,
  allowsPRs: Boolean
})
const emptyRequest = require('./emptyRequest')
const allowPRs = require('./allowPRs')

// Mind the order, the first match will be the winner
exports.directRequests = [ allowPRs, emptyRequest ]
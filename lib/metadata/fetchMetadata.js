const Arrow = require('arrow')

/**
 * Fetches metadata describing your connector's proper configuration.
 * @param next
 */
exports.fetchMetadata = function fetchMetadata (next) {
  next(null, {
    fields: [
      Arrow.Metadata.Text({
        name: 'sid',
        description: 'Accounts SID used to exercise the REST API',
        required: true
      }),
      Arrow.Metadata.Text({
        name: 'auth_token',
        description: 'Authentication token generated by Twilio',
        required: true
      }),
      Arrow.Metadata.Text({
        name: 'twilio_number',
        description: 'Twilio phone number you want to use',
        required: true
      })
    ]
  })
}
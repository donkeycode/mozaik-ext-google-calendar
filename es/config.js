var convict = require('convict');

var config = convict({
    googleCalendar: {
        client_id: {
            doc: 'The Google Calendar credentials client_id.',
            default: '',
            format: String,
            env: 'GOOGLE_CALENDAR_CLIENT_ID'
        },
        client_secret: {
            doc: 'The Google Calendar credentials client_secret.',
            default: '',
            format: String,
            env: 'GOOGLE_CALENDAR_CLIENT_SECRET'
        },
        redirect_uris: {
            doc: 'The Google Calendar credentials redirect_uris.',
            default: [],
            format: Array,
            env: 'GOOGLE_CALENDAR_REDIRECT_URIS'
        },
        token: {
            doc: 'The Google Clendar Token Provided',
            default: '',
            format: String,
            env: 'GOOGLE_CALENDAR_TOKEN'
        }
    }
});

module.exports = config;
const convict = require('convict')

const config = convict({
    googleCalendar: {
        baseUrl: {
            doc: 'The Google Clendar API base URL',
            default: 'https://www.googleapis.com/calendar/v3/',
            format: String,
            env: 'GOOGLE_CALENDAR_BASE_URL'
        },
        OAuth: {
            doc: 'The Google Calendar OAuth URL.',
			default: 'https://www.googleapis.com/auth/calendar.readonly',
            format: String,
            env: 'GOOGLE_CALENDAR_OAUTH_URL',
        },
        client_id: {
            doc: 'The Google Calendar client_id.',
			default: '',
            format: String,
            env: 'GOOGLE_CALENDAR_CLIENT_ID',
        },
        secret_id: {
            doc: 'The Google Calendar secre_id.',
			default: '',
            format: String,
            env: 'GOOGLE_CALENDAR_SECRET_ID',
        },
    },
})

module.exports = config

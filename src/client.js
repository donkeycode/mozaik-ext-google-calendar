'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')
const quickstart = require('../quickstart');

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    static let access_token;

    const buildApiRequest = (path, params) => {
        // const oauthUrl = config.get('googleCalendar.OAuth')
        // const client_id = config.get('googleCalendar.client_id')
        // const secret_id = config.get('googleCalendar.secret_id')

        return quickstart.getEvents();
    }

    const apiCalls = {

        calendar(params) {

        },
        dailySong(params) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            params = Object.assign({ oldest: date.getTime() / 1000}, params);
            return buildApiRequest(`/conversations.history`, params).then((res) => {
                return res.body.messages.filter(message => message.text.match(/^Le son du jour[\r?\n|\r]?.+/gi))[0]
            })
        }
    }

    return apiCalls
}

module.exports = client

'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')
// const quickstart = require('../quickstart');

const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const google = require('googleapis').google;
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'credentials.json';

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const getEventsOnly = (eventsByUser) => {
        const events = [];

        for (var i = 0; i < eventsByUser.length; i++) {
            if (eventsByUser[i].items) {
                for (var j = 0; j < eventsByUser[i].items.length; j++) {
                    events.push(eventsByUser[i].items[j]);
                }
            }
        }

        return events;
    }

    /**
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
    const getEventsByUser = (auth) => {
        return new Promise((resolve, reject) => {
            const calendar = google.calendar({version: 'v3', auth});

            calendar.calendarList.list({}, (err, {data}) => {
                if (err) {
                    console.warn('client.js ->', err);

                    return;
                }
                const calendarsList = data.items;
                const endDate = new Date();
                endDate.setHours(23, 59., 59, 999);
                const promises = [];

                calendarsList.map((c, i) => {
                    const promise = new Promise((resolve, reject) => {
                        calendar.events.list({
                            calendarId: c.id,
                            timeMin: (new Date()).toISOString(),
                            timeMax: endDate.toISOString(),
                            singleEvents: true,
                            orderBy: 'startTime',
                        }, (err, {data}) => {
                            resolve(data);
                        })
                    });
                    promises.push(promise);
                });

                Promise.all(promises)
                .then((results) => {
                    resolve(results);
                });
            });
        });
    }

    const apiCalls = {
        events() {
            const client_secret = config.get('googleCalendar.client_secret');
            const client_id = config.get('googleCalendar.client_id');
            const redirect_uris = config.get('googleCalendar.redirect_uris');
            const token = JSON.parse(config.get('googleCalendar.token'));

            const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
            oAuth2Client.setCredentials(token);

            return getEventsByUser(oAuth2Client)
            .then((datas) => {
                return getEventsOnly(datas);
            });
        }
    }

    return apiCalls
}

module.exports = client

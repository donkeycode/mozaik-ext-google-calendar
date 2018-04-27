'use strict';

var request = require('request-promise-native');
var chalk = require('chalk');
var config = require('./config');
// const quickstart = require('../quickstart');

var fs = require('fs');
var mkdirp = require('mkdirp');
var readline = require('readline');
var google = require('googleapis').google;
var OAuth2Client = google.auth.OAuth2;
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_PATH = 'credentials.json';

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var getEventsOnly = function getEventsOnly(eventsByUser) {
        var events = [];

        for (var i = 0; i < eventsByUser.length; i++) {
            if (eventsByUser[i].items) {
                for (var j = 0; j < eventsByUser[i].items.length; j++) {
                    events.push(eventsByUser[i].items[j]);
                }
            }
        }

        return events;
    };

    /**
    * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
    */
    var getEventsByUser = function getEventsByUser(auth) {
        return new Promise(function (resolve, reject) {
            var calendar = google.calendar({ version: 'v3', auth: auth });

            calendar.calendarList.list({}, function (err, _ref) {
                var data = _ref.data;

                var calendarsList = data.items;
                var endDate = new Date();
                endDate.setHours(23, 59., 59, 999);
                var promises = [];

                calendarsList.map(function (c, i) {
                    var promise = new Promise(function (resolve, reject) {
                        calendar.events.list({
                            calendarId: c.id,
                            timeMin: new Date().toISOString(),
                            timeMax: endDate.toISOString(),
                            singleEvents: true,
                            orderBy: 'startTime'
                        }, function (err, _ref2) {
                            var data = _ref2.data;

                            resolve(data);
                        });
                    });
                    promises.push(promise);
                });

                Promise.all(promises).then(function (results) {
                    resolve(results);
                });
            });
        });
    };

    var apiCalls = {
        events: function events() {
            var client_secret = config.get('googleCalendar.client_secret');
            var client_id = config.get('googleCalendar.client_id');
            var redirect_uris = config.get('googleCalendar.redirect_uris');
            var token = JSON.parse(config.get('googleCalendar.token'));

            var oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
            oAuth2Client.setCredentials(token);

            return getEventsByUser(oAuth2Client).then(function (datas) {
                return getEventsOnly(datas);
            });
        }
    };

    return apiCalls;
};

module.exports = client;
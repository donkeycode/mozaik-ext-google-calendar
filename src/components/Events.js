import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

const request = require('request-promise-native')

export default class Events extends Component {
    static PropTypes = {
        title: PropTypes.string,
        apiData: PropTypes.shape({
            Events: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ events }) {
        console.log('events', events);
        return {
            id: `googleCalendar.events`
        }
    }

    render() {
        const { apiData, apiError, title } = this.props;

        let body;
        if (apiData) {
            body = (
                <div id="googleCalendar">
                    <div id="events">
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={(title || 'Calendrier')}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}

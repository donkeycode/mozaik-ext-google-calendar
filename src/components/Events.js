import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

export default class Events extends Component {

    static PropTypes = {
        title: PropTypes.string,
        apiData: PropTypes.shape({
            Events: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest() {
        return {
            id: `googleCalendar.events`
        }
    }

	getReadableDate(date) {
		date = new Date(date);

		return date.getHours() + 'h' + ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes();
	}

	getCurrentDate() {
		var date = new Date();

		return date.getDate() + '/' + date.getMonth()+1 + '/' + date.getFullYear();
	}


    render() {
        const { apiData, apiError, title } = this.props;

        let body = <WidgetLoader />;
        if (apiData) {
            body = (
                <div id="googleCalendar">
                    {apiData.map(event =>
                         <div className="event">
                            <div className="top">
                                <div className="left">{event.creator.email}</div>
                                <div className="right">
                                    <span className="start">{event.start.date || this.getReadableDate(event.start.dateTime)}</span>
                                    <span className="end"> - {event.end.date || this.getReadableDate(event.end.dateTime)}</span>
                                </div>
                            </div>
                            <div className="middle">
                                <a href={event.htmlLink} target="_blank">
                                    {event.summary}
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        console.log('apidata', apiData);

        return (
            <Widget>
                <WidgetHeader
                    title={(title || 'Calendrier - ' + this.getCurrentDate())}
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

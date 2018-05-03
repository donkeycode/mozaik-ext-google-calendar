function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

var Events = function (_Component) {
    _inherits(Events, _Component);

    function Events() {
        _classCallCheck(this, Events);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Events.getApiRequest = function getApiRequest() {
        return {
            id: 'googleCalendar.events'
        };
    };

    Events.prototype.getReadableDate = function getReadableDate(date) {
        date = new Date(date);

        return date.getHours() + 'h' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    };

    Events.prototype.getCurrentDate = function getCurrentDate() {
        var date = new Date();

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    Events.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            apiData = _props.apiData,
            apiError = _props.apiError,
            title = _props.title;


        var body = React.createElement(WidgetLoader, null);
        if (apiData) {
            if (apiData.length) {
                body = React.createElement(
                    'div',
                    { id: 'googleCalendar' },
                    apiData.map(function (event) {
                        return React.createElement(
                            'div',
                            { className: 'event' },
                            React.createElement(
                                'div',
                                { className: 'top' },
                                React.createElement(
                                    'div',
                                    { className: 'left' },
                                    event.creator.email
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'right' },
                                    React.createElement(
                                        'span',
                                        { className: 'start' },
                                        event.start.date || _this2.getReadableDate(event.start.dateTime)
                                    ),
                                    React.createElement(
                                        'span',
                                        { className: 'end' },
                                        ' - ',
                                        event.end.date || _this2.getReadableDate(event.end.dateTime)
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'middle' },
                                React.createElement(
                                    'a',
                                    { href: event.htmlLink, target: '_blank' },
                                    event.summary
                                )
                            )
                        );
                    })
                );
            } else {
                body = React.createElement(
                    'div',
                    { id: 'calendar-empty' },
                    React.createElement(
                        'p',
                        null,
                        'Nothing to come today'
                    )
                );
            }
        }

        console.log('apidata', apiData);

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Calendrier - ' + this.getCurrentDate()
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Events;
}(Component);

Events.PropTypes = {
    title: PropTypes.string,
    apiData: PropTypes.shape({
        Events: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
export default Events;
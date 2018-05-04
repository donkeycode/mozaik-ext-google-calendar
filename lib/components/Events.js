'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            title = _props.title,
            view = _props.view;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            if (apiData.length) {
                body = _react2.default.createElement(
                    'div',
                    { id: 'googleCalendar' },
                    apiData.map(function (event) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'event' },
                            _react2.default.createElement(
                                'div',
                                { className: viewId },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'top' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'left' },
                                        event.creator.email
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'right' },
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'start' },
                                            event.start.date || _this2.getReadableDate(event.start.dateTime)
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'end' },
                                            ' - ',
                                            event.end.date || _this2.getReadableDate(event.end.dateTime)
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'middle' },
                                    _react2.default.createElement(
                                        'a',
                                        { href: event.htmlLink, target: '_blank' },
                                        event.summary
                                    )
                                )
                            )
                        );
                    })
                );
            } else {
                body = _react2.default.createElement(
                    'div',
                    { id: 'calendar-empty' },
                    _react2.default.createElement(
                        'p',
                        null,
                        'Nothing to come today'
                    )
                );
            }
        }

        console.log('apidata', apiData);

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Calendrier - ' + this.getCurrentDate()
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Events;
}(_react.Component);

Events.PropTypes = {
    title: _propTypes2.default.string,
    view: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        Events: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = Events;
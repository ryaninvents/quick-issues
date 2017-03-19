'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueItem extends _react2.default.Component {
    render() {
        const { issue, onClick } = this.props;
        const icoClass = `primary-line icon icon-issue-${issue.state === 'open' ? 'opened' : 'closed'} issue-state-${issue.state}`;
        return _react2.default.createElement(
            'li',
            { className: 'two-lines' },
            _react2.default.createElement(
                'div',
                { className: icoClass },
                _react2.default.createElement(
                    'a',
                    { onClick: () => onClick(issue) },
                    _react2.default.createElement(
                        'span',
                        { className: 'text-info' },
                        '#',
                        issue.number
                    ),
                    ' ',
                    issue.title
                )
            )
        );
    }
}

exports.default = IssueItem;
IssueItem.propTypes = {
    issue: _react2.default.PropTypes.object.isRequired,
    onClick: _react2.default.PropTypes.func.isRequired
};
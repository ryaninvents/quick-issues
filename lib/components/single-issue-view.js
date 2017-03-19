'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SingleIssueView extends _react2.default.Component {
    render() {
        const { issue } = this.props;
        const body = (0, _marked2.default)(issue.body || '');
        return _react2.default.createElement(
            'div',
            { className: 'single-issue-view' },
            _react2.default.createElement(
                'h1',
                null,
                '#',
                issue.number,
                ' ',
                issue.title
            ),
            _react2.default.createElement(
                'div',
                { className: 'issue-body' },
                _react2.default.createElement('article', { dangerouslySetInnerHTML: { __html: body } })
            )
        );
    }
}

exports.default = SingleIssueView;
SingleIssueView.propTypes = {
    issue: _react2.default.PropTypes.object.isRequired
};
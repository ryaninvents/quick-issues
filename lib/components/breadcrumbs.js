'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Breadcrumbs extends _react2.default.Component {
    renderCrumb(crumb, i) {
        const props = {
            key: i,
            children: crumb
        };
        if (i < this.props.crumbs.length) {
            props.onClick = () => this.props.onFollow(this.props.crumbs.slice(0, i));
            props.className = 'text-info';
            return _react2.default.createElement('a', props);
        }
        return _react2.default.createElement('span', props);
    }
    render() {
        const { crumbs } = this.props;
        const renderedCrumbs = [];
        crumbs.forEach((crumb, i) => {
            if (i > 0) renderedCrumbs.push(' \u203A ');
            renderedCrumbs.push(this.renderCrumb(crumb, i + 1));
        });
        return _react2.default.createElement(
            'div',
            { className: 'breadcrumbs' },
            _react2.default.createElement(
                'h2',
                null,
                renderedCrumbs
            )
        );
    }
}

exports.default = Breadcrumbs;
Breadcrumbs.propTypes = {
    crumbs: _react.PropTypes.array.isRequired,
    onFollow: _react.PropTypes.func.isRequired
};
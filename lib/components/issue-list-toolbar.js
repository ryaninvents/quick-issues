"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueListToolbar extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }
    handleFilterSelect(e) {
        this.props.onFilterChange(e.target.value);
    }
    render() {
        const { isLoading, onReload, filter, count } = this.props;
        const reloadButton = isLoading ? _react2.default.createElement(
            "button",
            { className: "btn ico-btn" },
            _react2.default.createElement("span", { className: "loading loading-spinner-tiny" })
        ) : _react2.default.createElement(
            "button",
            { className: "btn ico-btn", onClick: onReload },
            _react2.default.createElement("span", { className: "icon icon-repo-sync" })
        );
        const countDisplay = typeof count === 'number' ? _react2.default.createElement(
            "span",
            null,
            count,
            " issue",
            count === 1 || 's'
        ) : null;
        return _react2.default.createElement(
            "div",
            { className: "issue-list-toolbar" },
            _react2.default.createElement(
                "div",
                { className: "left-hand" },
                countDisplay
            ),
            _react2.default.createElement(
                "div",
                { className: "right-hand" },
                reloadButton,
                _react2.default.createElement(
                    "select",
                    { className: "input-select", value: filter, onChange: this.handleFilterSelect },
                    _react2.default.createElement(
                        "option",
                        { value: "open" },
                        "Open"
                    ),
                    _react2.default.createElement(
                        "option",
                        { value: "closed" },
                        "Closed"
                    ),
                    _react2.default.createElement(
                        "option",
                        { value: "all" },
                        "All"
                    )
                )
            )
        );
    }
}

exports.default = IssueListToolbar;
IssueListToolbar.propTypes = {
    isLoading: _react.PropTypes.bool,
    onReload: _react.PropTypes.func.isRequired,
    filter: _react.PropTypes.oneOf(['open', 'closed', 'all']),
    onFilterChange: _react.PropTypes.func.isRequired,
    count: _react.PropTypes.number
};
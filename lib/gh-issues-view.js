'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _issuesList = require('./components/issues-list');

var _issuesList2 = _interopRequireDefault(_issuesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GhIssuesView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('github-issues');
    _reactDom2.default.render(_react2.default.createElement(_issuesList2.default), this.element);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getView() {
    return this.element;
  }

  getTitle() {
    return 'GitHub Issues';
  }

  getUri() {
    return 'github-issues:///';
  }

}

exports.default = GhIssuesView;
GhIssuesView.Provider = view => view.element;
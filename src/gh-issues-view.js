/** @babel */
import React from 'react';
import ReactDOM from 'react-dom';
import IssuesList from './components/issues-list';

export default class GhIssuesView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('quick-issues');
    ReactDOM.render(React.createElement(IssuesList), this.element);
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
      return 'Quick Issues';
  }

  getUri() {
      return 'quick-issues:///';
  }

  getDefaultLocation() {
      return 'right';
  }
}

GhIssuesView.Provider = (view) => view.element;

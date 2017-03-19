'use strict';

var _ghIssuesView = require('./gh-issues-view');

var _ghIssuesView2 = _interopRequireDefault(_ghIssuesView);

var _atom = require('atom');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GH_ISSUES_RE = /^github-issues:\/\//;

module.exports = {

  config: _config2.default,

  views: null,
  subscriptions: null,

  activate(state) {
    this.views = [];

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new _atom.CompositeDisposable();

    // Register command that opens this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'github-issues:open': () => this.open()
    }));

    atom.workspace.addOpener(uri => {
      if (!uri.match(GH_ISSUES_RE)) return;
      const view = new _ghIssuesView2.default();
      this.views.push(view);
      return view;
    });
  },

  deactivate() {
    this.subscriptions.dispose();
    this.views.forEach(v => v.destroy());
  },

  serialize() {
    return {
      githubIssuesViewState: this.views.map(v => v.serialize())
    };
  },

  open() {
    atom.workspace.open('github-issues:///');
  }

};
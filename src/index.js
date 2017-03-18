import GhIssuesView from './gh-issues-view';
import {CompositeDisposable} from 'atom';
import config from './config';

const GH_ISSUES_RE = /^github-issues:\/\//;

module.exports = {

  config,

  views: null,
  subscriptions: null,

  activate(state) {
    this.views = [];

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that opens this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'github-issues:open': () => this.open(),
    }));

    atom.workspace.addOpener((uri) => {
        if (!uri.match(GH_ISSUES_RE)) return;
        const view = new GhIssuesView();
        this.views.push(view);
        return view;
    });
  },

  deactivate() {
    this.subscriptions.dispose();
    this.views.forEach((v) => v.destroy());
  },

  serialize() {
    return {
      githubIssuesViewState: this.views.map((v) => v.serialize()),
    };
  },

  open() {
    atom.workspace.open('github-issues:///');
  },

};


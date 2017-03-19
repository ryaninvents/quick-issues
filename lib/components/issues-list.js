'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _issueItem = require('./issue-item');

var _issueItem2 = _interopRequireDefault(_issueItem);

var _issueListToolbar = require('./issue-list-toolbar');

var _issueListToolbar2 = _interopRequireDefault(_issueListToolbar);

var _singleIssueView = require('./single-issue-view');

var _singleIssueView2 = _interopRequireDefault(_singleIssueView);

var _breadcrumbs = require('./breadcrumbs');

var _breadcrumbs2 = _interopRequireDefault(_breadcrumbs);

var _ghApi = require('../gh-api');

var _ghApi2 = _interopRequireDefault(_ghApi);

var _findRepos = require('../find-repos');

var _findRepos2 = _interopRequireDefault(_findRepos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const pkg = require('../../package.json');

class IssuesList extends _react2.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            filter: atom.config.get(`${pkg.name}.displayOptions.defaultFilter`),
            path: ['GitHub Issues']
        };
        this.reload = this.reload.bind(this);
        this.follow = this.follow.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }
    componentWillMount() {
        this.reload();
    }
    reload() {
        var _this = this;

        return _asyncToGenerator(function* () {
            _this.setState({ fetching: true, noReposAvailable: false });
            try {
                const repo = yield (0, _findRepos2.default)();
                if (!repo || !repo.user || !repo.name) {
                    _this.setState({
                        fetching: false,
                        issueCount: null,
                        noReposAvailable: true
                    });
                    return null;
                }
                const issues = yield _ghApi2.default.issuesForRepo(repo.user, repo.name, { state: 'all' });
                _this.setState({ issues, issueCount: issues.length, fetching: false });
            } catch (err) {
                _this.setState({ err, fetching: false });
            }
        })();
    }
    follow(path, activeIssue) {
        const nextState = { path, activeIssue };
        this.setState(nextState);
    }
    makeFollower(path, activeIssue) {
        return this.follow.bind(null, path, activeIssue);
    }
    handleFilterSelect(filter) {
        this.setState({ filter });
    }
    renderIssuesList() {
        const { issues, err, activeIssue, noReposAvailable, filter } = this.state;
        const isLoading = Boolean(!issues && !err);
        if (isLoading) {
            return _react2.default.createElement(
                'ul',
                { className: 'background-message centered' },
                _react2.default.createElement(
                    'li',
                    null,
                    'Fetching issues...'
                ),
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement('span', { className: 'loading loading-spinner-large' })
                )
            );
        }
        if (noReposAvailable) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'background-message centered error-messages' },
                    _react2.default.createElement(
                        'li',
                        null,
                        'No GitHub repos found'
                    )
                )
            );
        }
        if (err) {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'background-message centered error-messages' },
                    _react2.default.createElement(
                        'li',
                        null,
                        err.message
                    )
                )
            );
        }
        if (activeIssue) {
            return _react2.default.createElement(_singleIssueView2.default, { issue: activeIssue });
        }
        let displayedIssues = issues;
        if (filter !== 'all') {
            displayedIssues = issues.filter(iss => iss.state === filter);
        }
        return _react2.default.createElement(
            'ol',
            { className: 'list-group' },
            displayedIssues.map(issue => _react2.default.createElement(_issueItem2.default, {
                issue: issue,
                key: issue.id,
                onClick: this.makeFollower(['GitHub Issues', `Issue #${issue.number}`], issue)
            }))
        );
    }
    render() {
        const { path, fetching, filter, issueCount } = this.state;

        return _react2.default.createElement(
            'div',
            { style: { height: '100%', boxSizing: 'border-box' } },
            _react2.default.createElement(_breadcrumbs2.default, { crumbs: path, onFollow: this.follow }),
            path.length === 1 && _react2.default.createElement(_issueListToolbar2.default, {
                isLoading: fetching,
                onReload: this.reload,
                filter: filter,
                onFilterChange: this.handleFilterSelect,
                count: issueCount
            }),
            this.renderIssuesList()
        );
    }
}
exports.default = IssuesList;
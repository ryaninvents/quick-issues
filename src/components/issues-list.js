/** @babel */
import React from 'react';
import IssueItem from './issue-item';
import IssueListToolbar from './issue-list-toolbar';
import SingleIssueView from './single-issue-view';
import Breadcrumbs from './breadcrumbs';
import gh from '../gh-api';
import findRepos from '../find-repos';

const pkg = require('../../package.json');

export default class IssuesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetching: true,
            filter: atom.config.get(`${pkg.name}.displayOptions.defaultFilter`),
            path: ['Quick Issues'],
        };
        this.reload = this.reload.bind(this);
        this.follow = this.follow.bind(this);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }
    componentWillMount() {
        this.reload();
    }
    async reload() {
        this.setState({fetching: true, noReposAvailable: false});
        try {
            const repo = await findRepos();
            if (!repo || !repo.user || !repo.name) {
                this.setState({
                    fetching: false,
                    issueCount: null,
                    noReposAvailable: true,
                });
                return null;
            }
            const issues = await gh.issuesForRepo(repo.user, repo.name, {state: 'all'});
            this.setState({issues, issueCount: issues.length, fetching: false});
        } catch (err) {
            this.setState({err, fetching: false});
        }
    }
    follow(path, activeIssue) {
        const nextState = {path, activeIssue};
        this.setState(nextState);
    }
    makeFollower(path, activeIssue) {
        return this.follow.bind(null, path, activeIssue);
    }
    handleFilterSelect(filter) {
        this.setState({filter});
    }
    renderIssuesList() {
        const {issues, err, activeIssue, noReposAvailable, filter} = this.state;
        const isLoading = Boolean(!issues && !err);
        if (isLoading) {
            return (
                <ul className="background-message centered">
                    <li>Fetching issues...</li>
                    <li><span className="loading loading-spinner-large" /></li>
                </ul>
            );
        }
        if (noReposAvailable) {
            return (
                <div>
                    <ul className="background-message centered error-messages">
                        <li>No GitHub repos found</li>
                    </ul>
                </div>
            );
        }
        if (err) {
            return (
                <div>
                    <ul className="background-message centered error-messages">
                        <li>{err.message}</li>
                    </ul>
                </div>
            );
        }
        if (activeIssue) {
            return <SingleIssueView issue={activeIssue} />;
        }
        let displayedIssues = issues;
        if (filter !== 'all') {
            displayedIssues = issues.filter((iss) => iss.state === filter);
        }
        return (
            <ol className="list-group">
                {displayedIssues.map((issue) =>
                    <IssueItem
                        issue={issue}
                        key={issue.id}
                        onClick={this.makeFollower(
                            ['GitHub Issues', `Issue #${issue.number}`],
                            issue
                        )}
                    />
                )}
            </ol>
        );
    }
    render() {
        const {path, fetching, filter, issueCount} = this.state;

        return (
            <div style={{height: '100%', boxSizing: 'border-box'}}>
                <Breadcrumbs crumbs={path} onFollow={this.follow} />
                {path.length === 1 && (
                    <IssueListToolbar
                        isLoading={fetching}
                        onReload={this.reload}
                        filter={filter}
                        onFilterChange={this.handleFilterSelect}
                        count={issueCount}
                    />
                )}
                {this.renderIssuesList()}
            </div>
        );
    }
}

/** @babel */
import React from 'react';

export default class IssueItem extends React.Component {
    render() {
        const {issue, onClick} = this.props;
        const icoClass = `primary-line icon icon-issue-${
            issue.state === 'open' ? 'opened' : 'closed'
        } issue-state-${issue.state}`;
        return (
            <li className="two-lines">
                <div className={icoClass}>
                    <a onClick={() => onClick(issue)}>
                        <span className="text-info">#{issue.number}</span> {issue.title}
                    </a>
                </div>

            </li>
        );
    }
}

IssueItem.propTypes = {
    issue: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func.isRequired,
};

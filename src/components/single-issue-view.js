import React from 'react';
import marked from 'marked';

export default class SingleIssueView extends React.Component {
    render() {
        const {issue} = this.props;
        const body = marked(issue.body || '');
        return (
            <div className="single-issue-view">
                <h1>
                    #{issue.number} {issue.title}
                </h1>
                <div className="issue-body">
                    <article dangerouslySetInnerHTML={{__html: body}} />
                </div>
            </div>
        );
    }
}

SingleIssueView.propTypes = {
    issue: React.PropTypes.object.isRequired,
};

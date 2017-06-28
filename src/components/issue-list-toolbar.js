/** @babel */
import React, {PropTypes} from 'react';

export default class IssueListToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterSelect = this.handleFilterSelect.bind(this);
    }
    handleFilterSelect(e) {
        this.props.onFilterChange(e.target.value);
    }
    render() {
        const {isLoading, onReload, filter, count} = this.props;
        const reloadButton = (
            isLoading
                ? (
                    <button className="btn ico-btn">
                        <span className="loading loading-spinner-tiny" />
                    </button>
                )
                : (
                    <button className="btn ico-btn" onClick={onReload}>
                        <span className="icon icon-repo-sync" />
                    </button>
                )
        );
        const countDisplay = (
            typeof count === 'number'
                ? <span>{count} issue{(count === 1) || 's'}</span>
                : null
        );
        return (
            <div className="issue-list-toolbar">
                <div className="left-hand">
                    {countDisplay}
                </div>
                <div className="right-hand">
                    {reloadButton}
                    <select className="input-select" value={filter} onChange={this.handleFilterSelect}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
        );
    }
}

IssueListToolbar.propTypes = {
    isLoading: PropTypes.bool,
    onReload: PropTypes.func.isRequired,
    filter: PropTypes.oneOf(['open', 'closed', 'all']),
    onFilterChange: PropTypes.func.isRequired,
    count: PropTypes.number,
};

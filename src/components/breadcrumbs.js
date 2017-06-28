/** @babel */
import React, {PropTypes} from 'react';

export default class Breadcrumbs extends React.Component {
    renderCrumb(crumb, i) {
        const props = {
            key: i,
            children: crumb,
        };
        if (i < this.props.crumbs.length) {
            props.onClick = () => this.props.onFollow(this.props.crumbs.slice(0, i));
            props.className = 'text-info';
            return <a {...props} />;
        }
        return <span {...props} />;
    }
    render() {
        const {crumbs} = this.props;
        const renderedCrumbs = [];
        crumbs.forEach((crumb, i) => {
            if (i > 0) renderedCrumbs.push(' \u203A ');
            renderedCrumbs.push(this.renderCrumb(crumb, i + 1));
        });
        return (
            <div className="breadcrumbs">
                <h2>{renderedCrumbs}</h2>
            </div>
        );
    }
}

Breadcrumbs.propTypes = {
    crumbs: PropTypes.array.isRequired,
    onFollow: PropTypes.func.isRequired,
};

import React from 'react';
import { connect } from 'react-redux';

import { fetchTabs } from '../../actions';

import Tab from './Tab';

class Tabs extends React.Component {
    state = {
        tabs: []
    }

    componentDidMount() {
        this.props.fetchTabs();
        //fetch tabs action creator
    }

    render() {
        return (
            <div className="tabs-container">
                {this.state.tabs.map(tab => {
                    return <Tab key={tab.name} tab={tab} />;
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fetchingTabs: state.fetchingTabs
});

export default connect(mapStateToProps, { fetchTabs })(Tabs);
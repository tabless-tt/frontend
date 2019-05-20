import React from 'react';
import { connect } from 'react-redux';

class Tabs extends React.Component {
    state = {
        tabs: []
    }



    render() {
        return (
            <div className="tabs-container">

            </div>
        );
    }
}

const mapStateToProps = state => ({
    fetchingTabs: state.fetchingTabs
});

export default connect(mapStateToProps, {})(Tabs);
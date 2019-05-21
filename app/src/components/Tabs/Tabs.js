import React from 'react';
import { connect } from 'react-redux';

import { fetchTabs } from '../../actions';

import Tab from './Tab';

class Tabs extends React.Component {
    state = {
        tabs: [],
        user: {}
    }

    componentDidMount() {
        this.setState({user: this.props.userInfo});
        //fetch tabs action creator
        let temp = this.props.fetchTabs(this.props.userInfo.id);
        console.log('temp: ', temp);
        this.setState({tabs: temp});
    }

    render() {
        return (
            <div className="tabs-container">
                {this.props.userTabs.map(tab => {
                    return <Tab key={tab.tab_id} tab={tab} />;
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    fetchingTabs: state.fetchingTabs,
    userInfo: state.user,
    userTabs: state.tabs
});

export default connect(mapStateToProps, { fetchTabs })(Tabs);
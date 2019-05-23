import React from 'react';
import { connect } from 'react-redux';

import { fetchTabs, newTab } from '../../actions';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Tab from './Tab';
import './tabstyles.scss';

class Tabs extends React.Component {
    state = {
        tabs: [],
        user: {},
        newtab: {
            title: '',
            website: '',
            description: '',
            category: '',
            favicon: ''
        },
        modal: false
    }

    componentDidMount() {
        //console.log("running", localStorage.getItem('userid'));
        this.setState({user: this.props.userInfo});
        //fetch tabs action creator
        let id = localStorage.getItem('userid');
        let temp = this.props.fetchTabs(id);
        this.setState({tabs: temp});
    }

    componentDidUpdate(prevProps) {
        console.log('prev', prevProps);
        if (this.props.userTabs !== this.state.tabs) {
            this.setState({tabs: this.props.userTabs})
        }

        if (this.props.deletingTab) {
            //console.log('deleting is true');
            let id = localStorage.getItem('userid');
            this.props.fetchTabs(id);
        }
    }

    modalhandleChanges = e => {
        this.setState({
            newtab: {
                ...this.state.newtab,
                [e.target.name]: e.target.value
            }
        });
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.newTab(this.state.newtab)
        //close modal
        this.toggle();
    }

    toggle = () => {
        //console.log("inside toggle");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }


    
    render() {
        if (this.props.fetchingTabs)
            return <h1> loading </h1>
        else
            return (
                <div className="tabs-wrapper">
                    <div className="tab-header">
                        <button className="newtab-btn" onClick={() => this.toggle()}> Add a new Tab </button>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}> Add a new Tab </ModalHeader>
                        <ModalBody>
                            <form className="newTab-form" onSubmit={this.submitHandler}>
                                <p> Title: </p>
                                <input 
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={this.state.newtab.title} 
                                    onChange={this.modalhandleChanges}
                                    />
                                <p> Website: https://www.domain.com</p>
                                <input 
                                    type="text"
                                    name="website"
                                    placeholder="Website"
                                    value={this.state.newtab.website} 
                                    onChange={this.modalhandleChanges}
                                    />
                                <p> Description: </p>
                                <input 
                                    className="description-input"
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.newtab.description} 
                                    onChange={this.modalhandleChanges}
                                    />
                                {/* <input
                                    type="text"
                                    name="favicon"
                                    placeholder="Favicon URL"
                                    value={this.state.newtab.favicon}
                                    onChange={this.modalhandleChanges}
                                    /> */}

                                    <button> Submit </button>
                            </form>
                            </ModalBody>
                    </Modal>
                <div className="tabs-container">
                    {this.state.tabs.map(tab => {
                        return <Tab key={tab.tab_id} tab={tab} />;
                    })}
                </div>
            </div>
            );
    }
}

const mapStateToProps = state => ({
    fetchingTabs: state.fetchingTabs,
    userInfo: state.user,
    userTabs: state.tabs,
    deletingTab: state.deletingTab
});

export default connect(mapStateToProps, { fetchTabs, newTab })(Tabs);
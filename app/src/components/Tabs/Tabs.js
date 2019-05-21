import React from 'react';
import { connect } from 'react-redux';

import { fetchTabs, newTab } from '../../actions';

import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Tab from './Tab';
import './tabstyles.css';

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
        console.log("running", localStorage.getItem('userid'));
        this.setState({user: this.props.userInfo});
        //fetch tabs action creator
        let id = localStorage.getItem('userid');
        let temp = this.props.fetchTabs(id);
        //localStorage.setItem('userid', temp);
        this.setState({tabs: temp});
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
        //console.log(this.props.userInfo.id);
        //console.log("inside submitHandler");

        //new tab action
        //console.log('newtab is currently: ')
        // let newtab = {
        //     ...this.state.newtab,
        //     user_id: this.props.userInfo.id
        // }
        //console.log(newtab);
        this.props.newTab(this.state.newtab)
        //close modal
        this.toggle();
    }

    toggle = () => {
        console.log("inside toggle");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <div className="tab-header">
                    <button onClick={() => this.toggle()}> Add a new Tab </button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Add a new Tab </ModalHeader>
                    <ModalBody>
                        <form className="newTab-form" onSubmit={this.submitHandler}>
                            <input 
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={this.state.newtab.title} 
                                onChange={this.modalhandleChanges}
                                />
                            <input 
                                type="text"
                                name="website"
                                placeholder="Website"
                                value={this.state.newtab.website} 
                                onChange={this.modalhandleChanges}
                                />
                            <input 
                                className="description-input"
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={this.state.newtab.description} 
                                onChange={this.modalhandleChanges}
                                />
                            <input
                                type="text"
                                name="favicon"
                                placeholder="Favicon URL"
                                value={this.state.newtab.favicon}
                                onChange={this.modalhandleChanges}
                                />

                                <button> Submit </button>
                        </form>
                         </ModalBody>
                </Modal>
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

export default connect(mapStateToProps, { fetchTabs, newTab })(Tabs);
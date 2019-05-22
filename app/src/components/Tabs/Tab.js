import React from 'react';
import { connect } from 'react-redux';

import { deleteTab, updateTab, fetchTabs } from '../../actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './tabstyles.scss';

// props title, website, category


class Tab extends React.Component {
    state = {
        modal: false,
        updatedtab: {
            title: '',
            website: '',
            description: '',
            category: '',
            favicon: ''
        }
    }

    componentDidMount() {
        this.setState({updatedtab: {
            title: this.props.tab.title,
            website: this.props.tab.website,
            description: this.props.tab.description,
            category: this.props.tab.category,
            favicon: this.props.tab.favicon
        }})
    }

    componentDidUpdate(prevProps) {
        if (this.props.updatingTab) {
            let id = localStorage.getItem('userid');
            this.props.fetchTabs(id);
            this.setState({updatedtab: {
                title: this.props.tab.title,
                website: this.props.tab.website,
                description: this.props.tab.description,
                category: this.props.tab.category,
                favicon: this.props.tab.favicon
            }})
        }
    }
    modalhandleChanges = e => {
        this.setState({
            updatedtab: {
                ...this.state.updatedtab,
                [e.target.name]: e.target.value
            }
        });
    };

    toggle = () => {
        //console.log("tab: ", this.state.updatedtab);
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.updateTab(this.state.updatedtab, this.props.tab.tab_id);
        this.toggle();
    }

    deleteTabHandler = e => {
        e.preventDefault();
        this.props.deleteTab(this.props.tab.tab_id)
        this.toggle();
    }

    render() {
            return (
                <div className="tab-wrapper">
                    <div className="tab">
                        <div className='tab-head'>
                            <img src={`${this.props.tab.website}/favicon.ico`} alt='stariconsmall'/>
                            <h3 className='tab-title'>{this.props.tab.title}</h3>
                            <button className='editbutton' onClick={this.toggle}>Edit</button>
                        </div>
                        <div className='tab-body'>
                            <h5 className='tab-category'>{this.props.tab.category} </h5>
                            <p className='tab-website'>{this.props.tab.website}</p>
                            <p className='tab-description'>{this.props.tab.description}</p>
                        </div>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader> Edit your Tab <button onClick={this.deleteTabHandler}> X </button> </ModalHeader>
                                <form onSubmit={this.submitHandler}>
                                    <ModalBody> 
                                        <p> Title: </p>
                                            <input 
                                                type="text"
                                                name="title"
                                                placeholder={this.props.tab.title}
                                                onChange={this.modalhandleChanges}
                                                value={this.state.updatedtab.title} 
                                            />
                                        <p> Website URL: </p>
                                            <input 
                                                type="text"
                                                name="website"
                                                placeholder={this.props.tab.website}
                                                onChange={this.modalhandleChanges} 
                                                value={this.state.updatedtab.website}
                                            />
                                        <p> Category: </p>
                                            <input 
                                                type="text"
                                                name="category"
                                                placeholder={this.props.tab.category}
                                                onChange={this.modalhandleChanges} 
                                                value={this.state.updatedtab.category}
                                            />
                                        {/* <p> Favicon URL: </p>
                                            <input 
                                                type="text"
                                                name="favicon"
                                                placeholder={this.props.tab.favicon}
                                                onChange={this.modalhandleChanges} 
                                                value={this.state.updatedtab.favicon}
                                            /> */}
                                        <p> Description: </p>
                                            <input
                                                type="text"
                                                name="description"
                                                placeholder={this.props.tab.description}
                                                onChange={this.modalhandleChanges} 
                                                value={this.state.updatedtab.description}
                                            />
                                    </ModalBody>
                                    <ModalFooter><button> Submit Changes </button> </ModalFooter>
                            </form>
                    </Modal>
                </div>
                )};
    }


const mapStateToProps = state => ({
    deletingTab: state.deletingTab,
    fetchingTabs: state.fetchingTabs,
    updatingTab: state.updatingTab
});

export default connect(mapStateToProps, { deleteTab, updateTab, fetchTabs })(Tab);
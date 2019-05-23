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
                        <img src={`${this.props.tab.website}/favicon.ico`} alt="Favicon"/>
                        <h3 className='tab-title'>{this.props.tab.title}</h3>
                        <button className='editbutton' onClick={this.toggle}>Edit</button>
                    </div>
                    <div className='tab-body'>
                        <h5 className='tab-category'>{this.props.tab.category}</h5>
                        <a className='tab-website' href={this.props.tab.website}>Website</a>
                    </div>
                    <div className='tab-end'>
                        <p className='tab-description'>{this.props.tab.description}</p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader> Edit your Tab <button className="del-btn" onClick={this.deleteTabHandler}> Delete </button> </ModalHeader>
                            <form className="tab-form" onSubmit={this.submitHandler}>
                                <ModalBody>
                                <div className="title-wrap"> 
                                    <p> Title: </p>
                                        <input 
                                            className="title-input"
                                            type="text"
                                            name="title"
                                            placeholder={this.props.tab.title}
                                            onChange={this.modalhandleChanges}
                                            value={this.state.updatedtab.title} 
                                        />
                                </div>
                                <div className='web-wrap'>
                                    <p> Website URL: </p>
                                        <input 
                                            className="website-input"
                                            type="text"
                                            name="website"
                                            placeholder={this.props.tab.website}
                                            onChange={this.modalhandleChanges} 
                                            value={this.state.updatedtab.website}
                                        />
                                    </div>
                                    <div className='cat-wrap'>
                                    <p> Category: </p>
                                        <input
                                            className="category-input" 
                                            type="text"
                                            name="category"
                                            placeholder={this.props.tab.category}
                                            onChange={this.modalhandleChanges} 
                                            value={this.state.updatedtab.category}
                                        />
                                    </div>
                                    {/* <p> Favicon URL: </p>
                                        <input 
                                            type="text"
                                            name="favicon"
                                            placeholder={this.props.tab.favicon}
                                            onChange={this.modalhandleChanges} 
                                            value={this.state.updatedtab.favicon}
                                        /> */}
                                    <div className="desc-wrap">
                                    <p> Description: </p>
                                        <textarea
                                            className="description-input"
                                            type="text"
                                            name="description"
                                            placeholder={this.props.tab.description}
                                            onChange={this.modalhandleChanges} 
                                            value={this.state.updatedtab.description}
                                        />
                                    </div>
                                </ModalBody>
                                <ModalFooter><button className='submit-btn'> Submit Changes </button> </ModalFooter>
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
import React from 'react';
import { connect } from 'react-redux';

import { deleteTab, updateTab } from '../../actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// props title, website, category


class Tab extends React.Component {
    state = {
        modal: false,
        updatedtab: {
            title: null,
            website: null,
            description: null,
            category: null,
            favicon: null
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
        //console.log("inside toggle");
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    submitHandler = e => {
        e.preventDefault();
        console.log('inside submitHandler');
        console.log(this.state.updatedtab);
        console.log(this.props.tab.tab_id);
        this.props.updateTab(this.state.updatedtab, this.props.tab.tab_id);
    }

    deleteTabHandler = () => {
        console.log('inside Delete Handler');
        this.props.deleteTab(this.props.tab.tab_id);
        this.toggle();
    }

    render() {
        //console.log(this.props);
        return (
            <div className="tab-container">
                <div className="tab">
                    <img src={this.props.tab.favicon} alt='something'/>
                    <h3 className='tab-title'>{this.props.tab.title}</h3>
                    <p className='tab-website'>{this.props.tab.website}</p>
                    <button className='editbutton' onClick={this.toggle}>Edit</button>
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
                                    <p> Favicon URL: </p>
                                        <input 
                                            type="text"
                                            name="favicon"
                                            placeholder={this.props.tab.favicon}
                                            onChange={this.modalhandleChanges} 
                                            value={this.state.updatedtab.favicon}
                                        />
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
    deletingTab: state.deletingTab
});

export default connect(mapStateToProps, { deleteTab, updateTab })(Tab);
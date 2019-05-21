import React from 'react';
import { connect } from 'react-redux';

import { deleteTab } from '../../actions';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// props title, website, category


class Tab extends React.Component {
    state = {
        modal: false
    }

    
    modalhandleChanges = e => {
        this.setState({
            newtab: {
                ...this.state.newtab,
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
        console.log(this.props);
        e.preventDefault();
        console.log('inside submitHandler');
    }

    deleteTabHandler = () => {
        console.log('inside Delete Handler');
        console.log(this.props);
        this.props.deleteTab(this.props.tab.tab_id);
        this.toggle();
    }

    render() {
        console.log(this.props);
        return (
            <div className="tab-container">
                <div className="tab">
                    <img src={this.props.tab.favicon} alt='something'/>
                    <h3 className='tab-title'>{this.props.tab.title}</h3>
                    <p className='tab-website'>{this.props.tab.website}</p>
                    <button className='editbutton' onClick={this.toggle}>Edit</button>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader> Edit your Tab <button onClick={this.deleteTabHandler}> Delete Tab </button> </ModalHeader>
                            <form>
                                <ModalBody> Do it </ModalBody>
                                <ModalFooter><button> Submit Changes </button> </ModalFooter>
                            </form>
                </Modal>
            </div>
        )};
}

const mapStateToProps = state => ({
    deletingTab: state.deletingTab
});

export default connect(mapStateToProps, { deleteTab })(Tab);
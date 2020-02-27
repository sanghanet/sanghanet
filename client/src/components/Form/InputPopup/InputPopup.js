import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputPopup.scss';

import { Modal, Button } from 'react-bootstrap';

class InputPopup extends Component {
    // constructor (props) {
    //     super(props);
    //     this.textInput = React.createRef();
    //     this.state = {
    //         readOnly: true
    //     };
    // }

    // handleChange = (event) => {
    //     console.dir(event.key);
    //     this.props.onChange(event.target.value);
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     this.props.submit();
    // }

    // handleEdit = (event) => {
    //     if (this.state.readOnly) this.textInput.current.focus();
    //     this.setState((oldState) => ({ readOnly: !oldState.readOnly }));
    // }

    handleClose = () => {
        console.dir('Handle Close');
        this.props.onClose();
    }

    render () {
        return (
            <Modal show onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
// class Input extends Component {
//     render () {
//         const isSelect = this.props.type === 'select';

//         return (
//             <Form.Group>
//                 <Form.Label>{this.props.inputTitle}</Form.Label>
//                 {!isSelect && (
//                     <Form.Control
//                         type={this.props.type}
//                         id="firstName"
//                         name="firstName"
//                         placeholder={this.props.placeholder}
//                         value={this.props.inputValue}
//                         required
//                     >
//                     </Form.Control>
//                 )}
//                 {isSelect && (
//                     <Form.Control
//                         as="select"
//                         id="firstName"
//                         placeholder={this.props.placeholder}
//                         required
//                     >
//                         {this.props.optionsForSelect.map((option, index) => {
//                             return <option key={index}>{option}</option>;
//                         })}
//                     </Form.Control>
//                 )}
//             </Form.Group>
//         );
//     }
// }

InputPopup.propTypes = {
    // formId: PropTypes.string,
    // inputTitle: PropTypes.string.isRequired,
    // type: PropTypes.string.isRequired,
    // placeholder: PropTypes.string,
    // // optionsForSelect: PropTypes.array,
    // inputValue: PropTypes.string,
    // inputId: PropTypes.string,
    // onChange: PropTypes.func.isRequired,
    // submit: PropTypes.func.isRequired,
    // inDropdown: PropTypes.bool,
    // inputRef: PropTypes.string,
    onClose: PropTypes.func.isRequired
};

export default InputPopup;

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

    handleSave = () => {
        console.dir('Handle Save');
    }

    render () {
        const { modalShow, modalTitle, modalValue, modalClose } = this.props;

        return (
            <Modal show={modalShow} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalValue}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSave}>
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
    modalShow: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string,
    modalValue: PropTypes.string,
    modalClose: PropTypes.func.isRequired
};

export default InputPopup;

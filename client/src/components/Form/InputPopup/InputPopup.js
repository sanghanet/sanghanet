import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import './InputPopup.scss';

import { Modal, Button, Form } from 'react-bootstrap';

const InputPopup = (props) => {
    const { modalShow, modalTitle, modalId, modalValue, modalInputType, modalInputAs, modalClose, modalValueSave, options } = props;
    // const [currentValue, setCurrentValue] = useState(modalValue);
    const { register, errors, watch, handleSubmit } = useForm();

    const handleSubmitCustom = (data, event) => {
        console.log('Hello');
        console.log(data);
        console.dir(errors.firstName);
        // event.preventDefault();
        // modalValueSave(currentValue, modalId);
        // modalClose();
    };

    const handleChange = (event) => {
        // setCurrentValue(event.target.value);
    };

    const handleClose = () => {
        // setCurrentValue(modalValue);
        modalClose();
    };

    return (
    /* autoFocus works only if Modal animation={false} */
        <Modal show={modalShow} onHide={handleClose} animation={false} dialogClassName={'modal-container'}>
            <Form onSubmit={handleSubmitCustom} autoComplete='off'>
                <Modal.Header closeButton>
                    <Form.Label htmlFor={modalId}>{modalTitle}</Form.Label>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        ref={(data) => console.log(data)}
                        name="firstName"
                        as={modalInputAs}
                        type={modalInputType}
                        id={modalId}
                        // value={modalValue}
                        onChange={handleChange}
                        autoFocus
                    >
                        { options
                            ? options.map((option, index) => {
                                return (<option value={option} key={index}>{option}</option>);
                            })
                            : null
                        }
                    </Form.Control>
                    {errors.firstName && <span>This field is required</span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                            Cancel
                    </Button>
                    <Button onClick={handleSubmit(handleSubmitCustom)}>
                            Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

InputPopup.propTypes = {
    modalShow: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string,
    modalValue: PropTypes.string,
    modalClose: PropTypes.func.isRequired,
    modalId: PropTypes.string,
    modalValueSave: PropTypes.func,
    modalInputType: PropTypes.string,
    modalInputAs: PropTypes.string,
    options: PropTypes.array,
    inputArray: PropTypes.array
};

export default InputPopup;

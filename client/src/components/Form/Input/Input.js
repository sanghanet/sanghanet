import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Save } from '../formIcons/save.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
// import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import { Col, Form, InputGroup } from 'react-bootstrap';

class Input extends Component {
    constructor (props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            editDisabled: true
        };
    }

    handleChange = (event) => {
        this.props.onChange(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit();
    }

    handleEdit = (event) => {
        console.log('edit clicked');
        this.setState((oldState) => ({ editDisabled: !oldState.editDisabled }));
        // this.textInput.current.focus();
    }

    render () {
        const { formId, inputTitle, type, inputId, inputValue, placeholder } = this.props;
        const { editDisabled } = this.state;
        return (
            <Col xm={12} lg={6}>
                <Form onSubmit={this.handleSubmit} id={formId}>
                    <InputGroup className="input-group-label">
                        <Form.Label className="d-flex">
                            <img className="dropdown-arrow" alt="" />
                            {inputTitle}
                        </Form.Label>
                        <InputGroup.Append>
                            <button className="form-button" onClick={this.handleEdit}>
                                <Edit className="form-icon" />
                            </button>
                            <button className="form-button">
                                <Save className="form-icon"/>
                            </button>
                            <button className="form-button">
                                <Visible className="form-icon" />
                            </button>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className="input-group-field">
                        <Form.Control
                            type={type}
                            id={inputId}
                            name={inputId}
                            value={inputValue}
                            placeholder={placeholder}
                            aria-label={inputId}
                            onChange={this.handleChange}
                            required
                            disabled={editDisabled}
                            // inputRef={(ref) => { this.textInput = ref }}
                        ></Form.Control>
                        {/* <input type="text" ref={this.textInput} />AAAAAA */}
                    </InputGroup>
                </Form>
            </Col>
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

Input.propTypes = {
    formId: PropTypes.string,
    inputTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    // optionsForSelect: PropTypes.array,
    inputValue: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    inDropdown: PropTypes.bool,
    inputRef: PropTypes.string
};

export default Input;

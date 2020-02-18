import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Save } from '../formIcons/save.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
// import { ReactComponent as Invisible } from '../formIcons/invisible.svg';

import { Col, Form, InputGroup } from 'react-bootstrap';

class Input extends Component {
    handleChange = (event) => {
        this.props.editInput(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitFirstName();
    }

    render () {
        return (
            <Col xm={12} lg={6}>
                <Form onSubmit={this.handleSubmit}>
                    <InputGroup className="d-flex justify-content-between input-group-label">
                        <Form.Label>
                            {this.props.inputTitle}
                        </Form.Label>
                        <InputGroup.Append>
                            <button className="form-button" disabled>
                                <Save className="form-icon-edit"/>
                            </button>
                            <button className="form-button">
                                <Visible className="form-icon" />
                            </button>
                        </InputGroup.Append>
                    </InputGroup>
                    <InputGroup className="input-group-field">
                        <Form.Control
                            type={this.props.type}
                            id={this.props.inputId}
                            name={this.props.inputId}
                            value={this.props.inputValue}
                            placeholder={this.props.placeholder}
                            aria-label={this.props.inputId}
                            onChange={this.handleChange}
                            required
                        ></Form.Control>
                        <InputGroup.Append>
                            <Form.Label htmlFor={this.props.inputId}>
                                <Edit className="form-icon-edit" />
                            </Form.Label>
                        </InputGroup.Append>
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
    inputTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    // optionsForSelect: PropTypes.array,
    inputValue: PropTypes.string,
    inputId: PropTypes.string,
    editInput: PropTypes.func.isRequired,
    submitFirstName: PropTypes.func.isRequired
};

export default Input;

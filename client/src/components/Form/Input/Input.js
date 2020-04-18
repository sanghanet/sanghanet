/* This Input is obsolete. Might be used later. */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Input.scss';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Save } from '../formIcons/save.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';

import { Col, Form, InputGroup } from 'react-bootstrap';

class Input extends Component {
    constructor (props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            readOnly: true
        };
    }

    handleChange = (event) => {
        console.dir(event.key);
        this.props.onChange(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submit();
    }

    handleEdit = (event) => {
        if (this.state.readOnly) this.textInput.current.focus();
        this.setState((oldState) => ({ readOnly: !oldState.readOnly }));
    }

    render () {
        const { formId, inputTitle, type, inputId, inputValue, placeholder } = this.props;
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
                                <Visible className="form-icon" />
                            </button>
                            <button className="form-button">
                                <Save className="form-icon" />
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
                            ref={this.textInput}
                            readOnly={this.state.readOnly}
                            required
                        ></Form.Control>
                    </InputGroup>
                </Form>
            </Col>
        );
    }
}

/* <Input
    inputTitle="First name"
    type="text"
    inputId="first-name"
    inputValue={firstName}
    placeholder=""
    onChange={this.handleChangeFirstName}
    submit={this.handleSubmitFirstName}
/> */
Input.propTypes = {
    formId: PropTypes.string,
    inputTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    inputValue: PropTypes.string,
    inputId: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    inDropdown: PropTypes.bool,
    inputRef: PropTypes.string
};

export default Input;

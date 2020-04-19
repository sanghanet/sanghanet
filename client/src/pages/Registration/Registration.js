import React, { Component } from 'react';
import { ReactComponent as Buddha } from '../media/sangha_logo.svg';
import { Button, Form } from 'react-bootstrap';
import './Registration.scss';
import Client from '../../components/Client';

class Registration extends Component {
    state = {
        firstName: '',
        lastName: '',
        spiritualName: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        Client.fetch('/user/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: `{
                "firstName": "${this.state.firstName}",
                "lastName": "${this.state.lastName}",
                "spiritualName": "${this.state.spiritualName}"
            }`
        })
            .then((res) => {
                if (res.ok) { return res.json(res.body); }
            })
            .catch((err) => {
                console.log(err.message);
                window.location.href = '/';
            });

        // if (this.validation(input)) {
        //     this.props.modalValueSave(this.state.currentValue, this.props.modalId);
        //     this.props.modalClose();
        // };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleClose = () => {
        // this.setState({ currentValue: this.props.modalValue });
    }

    render () {
        const { firstName, lastName, spiritualName } = this.state;

        return (
            <div className='registration'>
                <header>
                    <h1>Registration to SanghaNet</h1>
                </header>
                {/* main is a div here to discard general main style */}
                <div className="registration-main">
                    <Buddha className="buddha" />
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={this.handleChange}
                            autoFocus
                        ></Form.Control>
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={this.handleChange}
                            autoFocus
                        ></Form.Control>
                        <Form.Label htmlFor="spiritualName">Spiritual Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="spiritualName"
                            value={spiritualName}
                            onChange={this.handleChange}
                            autoFocus
                        ></Form.Control>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            Registration
                        </Button>
                    </Form>
                </div>
            </div>
        );
    }
};

export default Registration;

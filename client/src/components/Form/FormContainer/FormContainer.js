import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Form } from 'react-bootstrap';

import './FormContainer.scss';

class FormContainer extends Component {
    render () {
        return (
            <Container className='position-absolute'>
                <Form className='form-container'>
                    <h2 className='text-center'>{this.props.formTitle.toUpperCase()}</h2>
                    <div id='grid'>
                        {this.props.children}
                    </div>
                </Form>
            </Container>
        );
    }
}

FormContainer.propTypes = {
    formTitle: PropTypes.string,
    children: PropTypes.element.isRequired
};

export default FormContainer;

import React from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';

import './FormContainer.scss';

interface FormContainerProps {
    formTitle: string,
    children: React.ReactNode
};

const FormContainer: React.FC<FormContainerProps> = ({ formTitle, children }) => {
    return (
        <Container>
            <h2 className="form-title">{formTitle.toUpperCase()}</h2>
            {children}
        </Container>
    );
};

FormContainer.propTypes = {
    formTitle: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default FormContainer;

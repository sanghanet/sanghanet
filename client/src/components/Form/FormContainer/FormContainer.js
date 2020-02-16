import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormContainer extends Component {
    render () {
        return (
            <form className="personal-form">
                <div className="general-data personal-blocks">
                    <h2 className="personal-form-h2">{this.props.formTitle}</h2>
                    {this.props.children}
                </div>
            </form>
        );
    }
}

FormContainer.propTypes = {
    formTitle: PropTypes.string,
    children: PropTypes.element.isRequired
};

export default FormContainer;

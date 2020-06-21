import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import './SearchBar.scss';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            dataList: null
        };
    }

    handleInputChange = (e) => { this.props.handleInputChange(e.target.value); }

    render () {
        return (
            <div className={`search-bar ${this.props.className}`}>
                <Form.Group controlId={this.props.controlId} className={'search-field'}>
                    <Form.Control
                        type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.handleInputChange}
                        value={this.props.inputValue}
                    />
                    <Form.Label onClick={this.props.handleIconClick} >
                        {this.props.icon}
                    </Form.Label>
                </Form.Group>
            </div>
        );
    }
}

SearchBar.propTypes = {
    controlId: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    icon: PropTypes.element,
    handleIconClick: PropTypes.func,
    className: PropTypes.string
};

export default SearchBar;

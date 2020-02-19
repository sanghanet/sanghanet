import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputDropdown.scss';

import { Col } from 'react-bootstrap';

class InputDropdown extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: false
        };
    }

    dropdown = null;
    collapsedHeight = 0;
    expandedHeight = 0;

    componentDidMount () {
        this.dropdown = document.getElementById('dropdown');

        this.collapsedHeight = this.dropdown.children[0].clientHeight;
        this.expandedHeight = this.collapsedHeight * this.dropdown.children.length;
        this.dropdown.style.height = `${this.collapsedHeight}px`;
    }

    toggleInputs = () => {
        this.setState((state) => ({ open: !state.open }));
        this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;
    }

    render () {
        const { headerInput, bodyInputs } = this.props;

        return (
            <Col xm={12} lg={6} className='input-dropdown'>
                <div id='dropdown' onClick={this.toggleInputs}>
                    {headerInput}
                    {bodyInputs.map((input) => { return input; })}
                </div>
            </Col>
        );
    }
}

InputDropdown.propTypes = {
    headerInput: PropTypes.element.isRequired,
    bodyInputs: PropTypes.array.isRequired
};

export default InputDropdown;

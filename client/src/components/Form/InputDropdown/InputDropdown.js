import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputDropdown.scss';

import UpArrow from '../../icons/arrow-up.svg';
import DownArrow from '../../icons/arrow-down.svg';

import { Col } from 'react-bootstrap';

class InputDropdown extends Component {
    constructor (props) {
        super(props);
        this.state = {
            open: this.props.open
        };
    }

    dropdown = null;
    arrowIcon = null;
    collapsedHeight = 0;
    expandedHeight = 0;

    componentDidMount () {
        this.dropdown = document.getElementById('dropdown');
        this.arrowIcons = document.querySelectorAll('#dropdown .dropdown-arrow');

        this.collapsedHeight = this.dropdown.children[0].clientHeight;
        this.expandedHeight = this.collapsedHeight * this.dropdown.children.length;
        this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;

        this.arrowIcons[0].src = this.state.open ? DownArrow : UpArrow;
    }

    toggleInputs = () => {
        this.setState((state) => ({ open: !state.open }));

        this.dropdown.style.height = !this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;
        this.arrowIcons[0].src = this.state.open ? DownArrow : UpArrow;
    }

    render () {
        return (
            <Col xm={12} lg={6} className='input-dropdown'>
                <div id='dropdown' onClick={this.toggleInputs}>
                    {this.props.children.map((input) => { return input; })}
                </div>
            </Col>
        );
    }
}

InputDropdown.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired
};

export default InputDropdown;

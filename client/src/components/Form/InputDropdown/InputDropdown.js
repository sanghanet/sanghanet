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
        this.arrowIcon = document.querySelectorAll('#dropdown .dropdown-arrow')[0];

        this.collapsedHeight = this.dropdown.children[0].clientHeight;
        this.expandedHeight = this.collapsedHeight * this.dropdown.children.length;
        this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;

        this.arrowIcon.src = this.state.open ? DownArrow : UpArrow;
        this.arrowIcon.parentElement.addEventListener('click', this.toggleInputs);
    }

    toggleInputs = (e) => {
        this.setState((state) => ({ open: !state.open }));

        this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;
        this.arrowIcon.src = this.state.open ? DownArrow : UpArrow;
    }

    render () {
        return (
            <Col xm={12} lg={6} className='input-dropdown'>
                <div id='dropdown'>
                    {this.props.children}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputDropdown.scss';

import { Col } from 'react-bootstrap';

class InputDropdown extends Component {
    componentDidMount () {
        // const label = document.getElementById('dropdown').firstChild.firstChild.firstChild;
        const dropdown = document.getElementById('dropdown');
        dropdown.addEventListener('click', this.toggleInputs);
    }

    toggleInputs = (e) => {
        e.currentTarget.classList.toggle('open');
    }

    render () {
        const { headerInput, bodyInputs } = this.props;

        return (
            <Col xm={12} lg={6} className='input-dropdown'>
                {/* <Accordion className="input-dropdown">
                    <Accordion.Toggle onClick={this.preventToggle}>
                        {headerInput}
                    </Accordion.Toggle>
                    <Accordion.Collapse>
                        <div>
                            {bodyInputs.map((input) => { return input; })}
                        </div>
                    </Accordion.Collapse>
                </Accordion> */}
                <div id='dropdown'>
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

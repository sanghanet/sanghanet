import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputPopup from '../InputPopup/InputPopup';
import { Col, Accordion, Card, Button } from 'react-bootstrap';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
import { ReactComponent as Invisible } from '../formIcons/invisible.svg';
import { ReactComponent as ArrowDown } from '../formIcons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../formIcons/arrow-up.svg';
import './InputDropdown.scss';

const InputDropdown = (props) => {
    const [show, setShow] = useState(false);
    const [activeKey, setKey] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (key) => {
        setShow(true);
        setKey(key);
    };

    const {
        dropdownTitle,
        dropdownId,
        dropdownIsVisible,
        dropdownVisibility,
        dropdownArrow,
        toggleDropdown,
        inputArray,
        inputValueSave
    } = props;

    const dropdownList = () => {
        return inputArray.map((item, index) => {
            return (
                <Card.Body key={index}>
                    <div className="display-input">
                        <p className="display-title">{item.inputValue}</p>
                        <button className="display-button edit-button" onClick={() => handleShow(index)}>
                            <Edit className="display-icon edit-icon" />
                        </button>
                    </div>
                </Card.Body>
            );
        });
    };
    return (
        <React.Fragment>
            {activeKey !== null // activeKey 0!!!, 1, 2
                ? (<InputPopup
                    modalShow={show}
                    modalTitle={inputArray[activeKey].inputTitle}
                    modalValue={inputArray[activeKey].inputValue}
                    modalClose={handleClose}
                    modalValueSave={inputValueSave}
                    modalId={inputArray[activeKey].inputId}
                />)
                : null
            }
            <Col xm={12} lg={6}>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={ () => toggleDropdown() }>
                                {dropdownTitle}
                                {dropdownArrow
                                    ? <ArrowDown />
                                    : <ArrowUp />
                                }
                            </Accordion.Toggle>
                            <button className="display-button visible-button" onClick={ () => dropdownVisibility(dropdownId) }>
                                {dropdownIsVisible
                                    ? <Visible className="display-icon visible-icon" />
                                    : <Invisible className="display-icon visible-icon" />
                                }
                            </button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <React.Fragment>
                                {dropdownList()}
                            </React.Fragment>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </React.Fragment>
    );
};

InputDropdown.propTypes = {
    dropdownTitle: PropTypes.string.isRequired,
    dropdownId: PropTypes.string.isRequired,
    inputValueSave: PropTypes.func,
    dropdownVisibility: PropTypes.func,
    dropdownIsVisible: PropTypes.bool.isRequired,
    inputFieldAs: PropTypes.string,
    dropdownArrow: PropTypes.bool,
    toggleDropdown: PropTypes.func,
    inputArray: PropTypes.array
};

export default InputDropdown;

// import UpArrow from '../../icons/arrow-up.svg';
// import DownArrow from '../../icons/arrow-down.svg';

// import { Col } from 'react-bootstrap';

// class InputDropdown extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             open: this.props.open
//         };
//     }

//     dropdown = null;
//     arrowIcon = null;
//     collapsedHeight = 0;
//     expandedHeight = 0;

//     componentDidMount () {
//         this.dropdown = document.getElementById('dropdown');
//         this.arrowIcon = document.querySelectorAll('#dropdown .dropdown-arrow')[0];

//         this.collapsedHeight = this.dropdown.children[0].clientHeight;
//         this.expandedHeight = this.collapsedHeight * this.dropdown.children.length;
//         this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;

//         this.arrowIcon.src = this.state.open ? DownArrow : UpArrow;
//         this.arrowIcon.parentElement.addEventListener('click', this.toggleInputs);
//     }

//     toggleInputs = (e) => {
//         this.setState((state) => ({ open: !state.open }));

//         this.dropdown.style.height = this.state.open ? `${this.expandedHeight}px` : `${this.collapsedHeight}px`;
//         this.arrowIcon.src = this.state.open ? DownArrow : UpArrow;
//     }

//     render () {
//         return (
//             <Col xm={12} lg={6} className='input-dropdown'>
//                 <div id='dropdown'>
//                     {this.props.children}
//                 </div>
//             </Col>
//         );
//     }
// }

// InputDropdown.propTypes = {
//     children: PropTypes.element.isRequired,
//     open: PropTypes.bool.isRequired
// };

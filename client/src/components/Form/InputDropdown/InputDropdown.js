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

    const handleClose = () => {
        setKey(null);
        setShow(false);
    };
    const handleShow = (key) => {
        setKey(key);
        setShow(true);
    };

    const {
        dropdownTitle,
        dropdownId,
        dropdownVisible,
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
                        <p className="display-title">{item.inputValue || 'Enter a value'}</p>
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
                    modalInputType={inputArray[activeKey].inputType}
                />)
                : null
            }
            <Col xm={12} lg={6}>
                <Accordion>
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
                                {dropdownVisible
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
    dropdownVisible: PropTypes.bool.isRequired,
    inputFieldAs: PropTypes.string,
    dropdownArrow: PropTypes.bool,
    toggleDropdown: PropTypes.func,
    inputArray: PropTypes.array
};

export default InputDropdown;

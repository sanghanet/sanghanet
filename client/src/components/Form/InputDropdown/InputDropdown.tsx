import React, { useState, useContext } from 'react';
import { UIcontext } from '../../contexts/UIcontext/UIcontext';
import PropTypes from 'prop-types';
import InputPopup from '../InputPopup/InputPopup';
import { Col, Accordion, Card, Button } from 'react-bootstrap';
import { ReactComponent as Edit } from '../formIcons/edit.svg';
import { ReactComponent as Visible } from '../formIcons/visible.svg';
import { ReactComponent as Invisible } from '../formIcons/invisible.svg';
import { ReactComponent as ArrowDown } from '../formIcons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../formIcons/arrow-up.svg';
import './InputDropdown.scss';

interface InputDropdownProps {
    dropdownTitle: string;
    dropdownId: string;
    inputValueSave: (id: string, value: string) => void;
    dropdownVisibility: (s: string) => void;
    dropdownVisible: boolean;
    dropdownArrow?: boolean;
    toggleDropdown: () => void;
    inputArray: Array<DropdownInputType>;
};

const InputDropdown: React.FC<InputDropdownProps> = (props) => {
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

    const { personalPagePlaceholders } = useContext(UIcontext).dictionary;

    const [show, setShow] = useState(false);
    const [activeKey, setKey] = useState<null | number>(null);

    const handleClose = (): void => {
        setKey(null);
        setShow(false);
    };

    const handleShow = (key: number): void => {
        setKey(key);
        setShow(true);
    };

    const dropdownList = (): Array<JSX.Element> => {
        return inputArray.map((item, index) => {
            return (
                <Card.Body key={index}>
                    <div className="display-input">
                        <p className="display-title">{item.inputValue || item.inputTitle}</p>
                        <button className="display-button edit-button" onClick={(): void => handleShow(index)}>
                            <Edit className="display-icon edit-icon" />
                        </button>
                    </div>
                </Card.Body>
            );
        });
    };

    return (
        <>
            {activeKey !== null && // activeKey 0!!!, 1, 2
                <InputPopup
                    modalShow={show}
                    modalTitle={inputArray[activeKey].inputTitle}
                    modalValue={inputArray[activeKey].inputValue}
                    modalClose={handleClose}
                    modalValueSave={inputValueSave}
                    modalId={inputArray[activeKey].inputId}
                    modalInputType={inputArray[activeKey].inputType}
                    modalValidation={inputArray[activeKey].validation}
                    modalFormat={inputArray[activeKey].format}
                    modalPlaceholder={personalPagePlaceholders.ENTERVALUE}
                />}
            <Col xs={12} lg={6}>
                <Accordion className="input-accordion">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={(): void => toggleDropdown()}>
                                {dropdownTitle}
                                {dropdownArrow
                                    ? <ArrowDown />
                                    : <ArrowUp />}
                            </Accordion.Toggle>
                            <button className="display-button visible-button" onClick={(): void => dropdownVisibility(dropdownId)}>
                                {dropdownVisible
                                    ? <Visible className="display-icon visible-icon" />
                                    : <Invisible className="display-icon visible-icon" />}
                            </button>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <>
                                {dropdownList()}
                            </>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </Col>
        </>
    );
};

InputDropdown.propTypes = {
    dropdownTitle: PropTypes.string.isRequired,
    dropdownId: PropTypes.string.isRequired,
    inputValueSave: PropTypes.func.isRequired,
    dropdownVisibility: PropTypes.func.isRequired,
    dropdownVisible: PropTypes.bool.isRequired,
    dropdownArrow: PropTypes.bool,
    toggleDropdown: PropTypes.func.isRequired,
    inputArray: PropTypes.array.isRequired
};

export default InputDropdown;

import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';

import './FilterAccordion.scss';

import { ReactComponent as Cross } from '../../../../components/icons/cross.svg';
import { ReactComponent as Arrow } from '../../../../components/Form/formIcons/arrow-up.svg';
import SearchBar from '../../../../components/Search/SearchBar';
import Checkbox from '../../../../components/Form/Checkbox/Checkbox';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

/*
    --------------------------------------
    This component was originally embedded in Superuser.js, but
    it was removed in order to make Superuser.js more readable.
    --------------------------------------
*/
const FilterAccordion = (props) => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const { superuser } = useContext(UIcontext).dictionary;
    const { FILTERMEMBERS, FILTERTEXT, FILTERSHOW, FILTERALL, FILTERREGISTERED, FILTERUNREGISTERED, RESETFILTERS, FILTERSUPERUSER, FILTERFINADMIN, FILTEREVENTADMIN, FILTERYOGAADMIN, FILTERNOROLE } = superuser;

    const handleEmailFilterChange = (inputValue) => { props.handleEmailFilterChange(inputValue); };
    const handleSearchIconClick = (event) => { props.handleSearchIconClick(event); };
    const handleRoleChange = (event) => { props.handleRoleChange(event); };
    const handleRegisteredFilterChange = (event) => { props.handleRegisteredFilterChange(event); };
    const resetFilters = () => { props.resetFilters(); };

    const preventSubmit = (event) => {
        if (event.key === 'Enter') event.preventDefault();
    };

    return (
        <Accordion onKeyDown={preventSubmit} className="su-filter-accordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle onClick={() => setDropDownVisible(prevState => !prevState)} as={Button} variant="primary" eventKey="0">
                        <span className="arrow-icon" eventKey="0">
                            <Arrow className={dropDownVisible ? "arrowUp" : "arrowDown"}/>
                        </span>
                        {FILTERMEMBERS}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form className="filter-box">
                            <Form.Group className="search-filter">
                                <SearchBar
                                    controlId='accordionTextFilter'
                                    handleInputChange={handleEmailFilterChange}
                                    handleIconClick={handleSearchIconClick}
                                    inputValue={props.textFilterValue}
                                    icon={<Cross />}
                                />
                                <Form.Text>{FILTERTEXT}</Form.Text>
                            </Form.Group>
                            <Form.Group className="registered-filter">
                                <Form.Label>{FILTERSHOW}</Form.Label>
                                <Form.Control
                                    onChange={handleRegisteredFilterChange}
                                    defaultValue={props.registeredFilterValue}
                                    as="select"
                                >
                                    <option value="all">{FILTERALL}</option>
                                    <option value="registered">{FILTERREGISTERED}</option>
                                    <option value="unregistered">{FILTERUNREGISTERED}</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="role-filter">
                                <Checkbox
                                    id="filterSuperuser"
                                    value={FILTERSUPERUSER}
                                    checked={props.roleFilter.filterSuperuser}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterFinanceAdmin"
                                    value={FILTERFINADMIN}
                                    checked={props.roleFilter.filterFinanceAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterEventAdmin"
                                    value={FILTEREVENTADMIN}
                                    checked={props.roleFilter.filterEventAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterYogaAdmin"
                                    value={FILTERYOGAADMIN}
                                    checked={props.roleFilter.filterYogaAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterNoRole"
                                    value={FILTERNOROLE}
                                    checked={props.roleFilter.filterNoRole}
                                    handleChange={handleRoleChange}
                                />
                            </Form.Group>
                            <Button className="reset-button" variant="outline-primary" onClick={resetFilters}>{RESETFILTERS}</Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

FilterAccordion.propTypes = {
    handleEmailFilterChange: PropTypes.func.isRequired,
    handleSearchIconClick: PropTypes.func.isRequired,
    handleRegisteredFilterChange: PropTypes.func.isRequired,
    handleRoleChange: PropTypes.func.isRequired,
    resetFilters: PropTypes.func.isRequired,
    textFilterValue: PropTypes.string.isRequired,
    registeredFilterValue: PropTypes.string.isRequired,
    roleFilter: PropTypes.object.isRequired
};

export default FilterAccordion;

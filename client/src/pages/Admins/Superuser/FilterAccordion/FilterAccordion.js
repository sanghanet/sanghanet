import React from 'react';
import PropTypes from 'prop-types';

import './FilterAccordion.scss';

import { ReactComponent as Cross } from '../../../../components/icons/cross.svg';
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
    const handleEmailFilterChange = (inputValue) => { props.handleEmailFilterChange(inputValue); };
    const handleSearchIconClick = (event) => { props.handleSearchIconClick(event); };
    const handleRoleChange = (event) => { props.handleRoleChange(event); };
    const handleRegisteredFilterChange = (event) => { props.handleRegisteredFilterChange(event); };
    const resetFilters = () => { props.resetFilters(); };

    return (
        <Accordion className="su-filter-accordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                        Filter members
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
                                <Form.Text>Filter by name or email address</Form.Text>
                            </Form.Group>
                            <Form.Group className="registered-filter">
                                <Form.Label>Show</Form.Label>
                                <Form.Control
                                    onChange={handleRegisteredFilterChange}
                                    defaultValue={props.registeredFilterValue}
                                    as="select"
                                >
                                    <option>all</option>
                                    <option>registered</option>
                                    <option>unregistered</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="role-filter">
                                <Checkbox
                                    id="filterSuperuser"
                                    value="superuser"
                                    checked={props.roleFilter.filterSuperuser}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterFinanceAdmin"
                                    value="finance admin"
                                    checked={props.roleFilter.filterFinanceAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterEventAdmin"
                                    value="event admin"
                                    checked={props.roleFilter.filterEventAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterYogaAdmin"
                                    value="yoga admin"
                                    checked={props.roleFilter.filterYogaAdmin}
                                    handleChange={handleRoleChange}
                                />
                                <Checkbox
                                    id="filterNoRole"
                                    value="no role"
                                    checked={props.roleFilter.filterNoRole}
                                    handleChange={handleRoleChange}
                                />
                            </Form.Group>
                            <Button className="reset-button" variant="outline-primary" onClick={resetFilters}>Reset filters</Button>
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

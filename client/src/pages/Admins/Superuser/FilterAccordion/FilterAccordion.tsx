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
type RoleFilter = {
    filterSuperuser: boolean;
    filterFinanceAdmin: boolean;
    filterEventAdmin: boolean;
    filterYogaAdmin: boolean;
    filterNoRole: boolean;
};

interface AccordionProps {
    onEmailFilterChange: (inputValue: string) => void;
    onSearchIconClick: React.MouseEventHandler<HTMLLabelElement>;
    onRegisteredFilterChange: React.ChangeEventHandler<HTMLInputElement>;
    onRoleChange: React.MouseEventHandler<HTMLButtonElement>;
    onResetFilters: React.MouseEventHandler<HTMLButtonElement>;
    textFilterValue: string;
    registeredFilterValue: string;
    roleFilter: RoleFilter;
};

const FilterAccordion: React.FC<AccordionProps> = ({
    onEmailFilterChange,
    onSearchIconClick,
    onRegisteredFilterChange,
    onRoleChange,
    onResetFilters,
    textFilterValue,
    registeredFilterValue,
    roleFilter
}) => {
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const { superuser } = useContext(UIcontext).dictionary;
    const { FILTERMEMBERS, FILTERTEXT, FILTERSHOW, FILTERALL, FILTERREGISTERED, FILTERUNREGISTERED, RESETFILTERS, FILTERSUPERUSER, FILTERFINADMIN, FILTEREVENTADMIN, FILTERYOGAADMIN, FILTERNOROLE } = superuser;

    const _handleEmailFilterChange = onEmailFilterChange;
    const _handleSearchIconClick = onSearchIconClick;
    const _handleRoleChange = onRoleChange;
    const _handleRegisteredFilterChange = onRegisteredFilterChange;

    const preventSubmit = (event: React.KeyboardEvent<HTMLElement>): void => {
        if (event.key === 'Enter') event.preventDefault();
    };

    const handleResetFiltersClick: React.MouseEventHandler<HTMLButtonElement> = (event) => { onResetFilters(event); };

    return (
        <Accordion onKeyDown={preventSubmit} className="su-filter-accordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle onClick={(): void => setDropDownVisible((prevState) => !prevState)} as={Button} variant="primary" eventKey="0">
                        <span className="arrow-icon">
                            <Arrow className={dropDownVisible ? 'arrowUp' : 'arrowDown'} />
                        </span>
                        {FILTERMEMBERS}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form className="filter-box">
                            <Form.Group className="search-filter">
                                <SearchBar
                                    controlId="accordionTextFilter"
                                    handleInputChange={_handleEmailFilterChange}
                                    handleIconClick={_handleSearchIconClick}
                                    inputValue={textFilterValue}
                                    icon={<Cross />}
                                />
                                <Form.Text>{FILTERTEXT}</Form.Text>
                            </Form.Group>
                            <Form.Group className="registered-filter">
                                <Form.Label>{FILTERSHOW}</Form.Label>
                                <Form.Control
                                    onChange={_handleRegisteredFilterChange}
                                    defaultValue={registeredFilterValue}
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
                                    checked={roleFilter.filterSuperuser}
                                    handleChange={_handleRoleChange}
                                />
                                <Checkbox
                                    id="filterFinanceAdmin"
                                    value={FILTERFINADMIN}
                                    checked={roleFilter.filterFinanceAdmin}
                                    handleChange={_handleRoleChange}
                                />
                                <Checkbox
                                    id="filterEventAdmin"
                                    value={FILTEREVENTADMIN}
                                    checked={roleFilter.filterEventAdmin}
                                    handleChange={_handleRoleChange}
                                />
                                <Checkbox
                                    id="filterYogaAdmin"
                                    value={FILTERYOGAADMIN}
                                    checked={roleFilter.filterYogaAdmin}
                                    handleChange={_handleRoleChange}
                                />
                                <Checkbox
                                    id="filterNoRole"
                                    value={FILTERNOROLE}
                                    checked={roleFilter.filterNoRole}
                                    handleChange={_handleRoleChange}
                                />
                            </Form.Group>
                            <Button className="reset-button" variant="outline-primary" onClick={handleResetFiltersClick}>{RESETFILTERS}</Button>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

FilterAccordion.propTypes = {
    onEmailFilterChange: PropTypes.func.isRequired,
    onSearchIconClick: PropTypes.func.isRequired,
    onRegisteredFilterChange: PropTypes.func.isRequired,
    onRoleChange: PropTypes.func.isRequired,
    onResetFilters: PropTypes.func.isRequired,
    textFilterValue: PropTypes.string.isRequired,
    registeredFilterValue: PropTypes.string.isRequired,
    roleFilter: PropTypes.exact({
        filterSuperuser: PropTypes.bool.isRequired,
        filterFinanceAdmin: PropTypes.bool.isRequired,
        filterEventAdmin: PropTypes.bool.isRequired,
        filterYogaAdmin: PropTypes.bool.isRequired,
        filterNoRole: PropTypes.bool.isRequired
    }).isRequired
};

export default FilterAccordion;

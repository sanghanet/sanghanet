import React, { useContext, useState } from 'react';
import './TransactionFilterAccordion.scss';
import { ReactComponent as Arrow } from '../../../../components/Form/formIcons/arrow-up.svg';
import { DeletedFilter } from '../../../../enums/DeletedFilter';
import { Accordion, Button, Card, Col, Form, Row, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { addMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { UIcontext } from '../../../../components/contexts/UIcontext/UIcontext';
import PropTypes from 'prop-types';

type TransactionFilterAccordionProps = {
    dueDateFromFilter: Date | null;
    dueDateToFilter: Date | null;
    deletedTransactionsFilter: string;
    handleDueDateFromChange: (date: Date | null) => void;
    handleDueDateToChange: (date: Date | null) => void;
    handleDeletedFilterChange: (x: DeletedFilter) => void;
};

const TransactionFilterAccordion: React.FC<TransactionFilterAccordionProps> = (props) => {
    const {
        dueDateFromFilter,
        dueDateToFilter,
        deletedTransactionsFilter,
        handleDueDateFromChange,
        handleDueDateToChange,
        handleDeletedFilterChange,
    } = props;
    const [dropDownVisible, setDropDownVisible] = useState(false);
    const dateFormat = 'MM/yyyy';
    const minDate = addMonths(new Date(), -18);
    const maxDate = addMonths(new Date(), 6);

    const { deletedTransactionsFilterTypes, transactionFilterLabels } =
        useContext(UIcontext).dictionary;

    const { ALL, ACTIVE, DELETED } = DeletedFilter;

    const deletedFilters = [
        { name: deletedTransactionsFilterTypes[ALL], value: ALL },
        { name: deletedTransactionsFilterTypes[ACTIVE], value: ACTIVE },
        { name: deletedTransactionsFilterTypes[DELETED], value: DELETED },
    ];

    return (
        <Accordion className="transactions-filter-accordion">
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                        onClick={(): void => setDropDownVisible((prevState) => !prevState)}
                        as={Button}
                        variant="primary"
                        eventKey="0"
                    >
                        <span className="arrow-icon">
                            <Arrow className={dropDownVisible ? 'arrowUp' : 'arrowDown'} />
                        </span>
                        {transactionFilterLabels.ACCORDION_LABEL}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form className="filter-box">
                            <Form.Group as={Row} className="deleted-filter">
                                <ButtonGroup as={Col} sm="8" xl="6" toggle>
                                    {deletedFilters.map(({ name, value }, idx) => (
                                        <ToggleButton
                                            as={Col}
                                            key={idx}
                                            type="radio"
                                            variant={deletedTransactionsFilter === value ? 'primary' : 'secondary'}
                                            name="radio"
                                            value={value}
                                            checked={deletedTransactionsFilter === value}
                                            onChange={(e): void => handleDeletedFilterChange(e.currentTarget.value as DeletedFilter)}
                                        >
                                            {name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label as={Col} xs="5" sm="3" lg="2">
                                    {transactionFilterLabels.DUE_DATE_FROM}
                                </Form.Label>
                                <Col xs="5" sm="3" lg="2">
                                    <DatePicker
                                        id="due-date-from"
                                        className="form-control"
                                        selected={dueDateFromFilter}
                                        dateFormat={dateFormat}
                                        onChange={handleDueDateFromChange}
                                        showMonthYearPicker
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        showDisabledMonthNavigation
                                        withPortal
                                        autoComplete="off"
                                        isClearable
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label as={Col} xs="5" sm="3" lg="2">
                                    {transactionFilterLabels.DUE_DATE_TO}
                                </Form.Label>
                                <Col xs="5" sm="3" lg="2">
                                    <DatePicker
                                        id="due-date-to"
                                        className="form-control"
                                        selected={dueDateToFilter}
                                        dateFormat={dateFormat}
                                        onChange={handleDueDateToChange}
                                        showMonthYearPicker
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        showDisabledMonthNavigation
                                        withPortal
                                        autoComplete="off"
                                        isClearable
                                    />
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

TransactionFilterAccordion.propTypes = {
    dueDateFromFilter: PropTypes.instanceOf(Date),
    dueDateToFilter: PropTypes.instanceOf(Date),
    deletedTransactionsFilter: PropTypes.string.isRequired,
    handleDueDateFromChange: PropTypes.func.isRequired,
    handleDueDateToChange: PropTypes.func.isRequired,
    handleDeletedFilterChange: PropTypes.func.isRequired,
};

export default TransactionFilterAccordion;

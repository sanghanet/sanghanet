import React, { ChangeEvent, useContext, useState } from 'react';
import './TransactionFilterAccordion.scss';
import { ReactComponent as Arrow } from '../../../../components/Form/formIcons/arrow-up.svg';
import { DeletedFilter } from '../../../../enums/DeletedFilter';
import { Accordion, Button, Card, Col, Form, Row } from 'react-bootstrap';
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
    handleDeletedFilterChange: (event: ChangeEvent<HTMLSelectElement>) => void;
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
                        Szűrés
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form className="filter-box">
                            <Form.Group as={Row} className="deleted-filter">
                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">
                                    {transactionFilterLabels.SHOW_DELETED}
                                </Form.Label>
                                <Col xs="5" sm="3" lg="2">
                                    <Form.Control
                                        onChange={handleDeletedFilterChange}
                                        defaultValue={deletedTransactionsFilter}
                                        as="select"
                                    >
                                        <option value={DeletedFilter.ALL}>
                                            {deletedTransactionsFilterTypes[DeletedFilter.ALL]}
                                        </option>
                                        <option value={DeletedFilter.ACTIVE}>
                                            {deletedTransactionsFilterTypes[DeletedFilter.ACTIVE]}
                                        </option>
                                        <option value={DeletedFilter.DELETED}>
                                            {deletedTransactionsFilterTypes[DeletedFilter.DELETED]}
                                        </option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">
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
                                        showPopperArrow={false}
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
                                <Form.Label as={Col} xs="5" sm="3" lg="2" className="label">
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
                                        showPopperArrow={false}
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

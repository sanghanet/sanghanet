import React, { useContext } from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { UIcontext } from '../contexts/UIcontext/UIcontext';

const FinanceDashboard = (props) => {
    const { financeDashboard, financePockets } = useContext(UIcontext).dictionary;
    const { BEFOREPOCKETNAME, AFTERPOCKETNAME } = financeDashboard;

    const { balance, currency } = props;

    return (
        <div className = "overview" >
            {Object.entries(balance).map(([key, value]) => {
                return (
                    <div key = {key}>
                        {BEFOREPOCKETNAME + financePockets[key.toUpperCase()] + AFTERPOCKETNAME + `${value} ${currency}`}
                    </div>
                );
            })}
        </div>
    );
}

FinanceDashboard.propTypes = {
    balance: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired
};

export default FinanceDashboard;

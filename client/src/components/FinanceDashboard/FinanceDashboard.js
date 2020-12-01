import React, { useState, useContext, useEffect } from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { UIcontext } from '../contexts/UIcontext/UIcontext';

const FinanceDashboard = (props) => {
    const [balances, setBalances] = useState([]);

    const { financeDashboard, financeDashboardPockets } = useContext(UIcontext).dictionary;
    const { BEFOREPOCKETNAME, AFTERPOCKETNAME } = financeDashboard;

    const buildFinanceOverview = (balance, currency) => {
        try {
            const categories = [];
            for (const [key, value] of Object.entries(balance)) {
                categories.push(
                    <div key = {key}>
                        {BEFOREPOCKETNAME + financeDashboardPockets[key.toUpperCase()] + AFTERPOCKETNAME + `${value} ${currency}`}
                    </div>
                );
            }
            setBalances(categories)
        } catch (error) {
            props.onError(error);
        }
    }

    useEffect(() => {
        buildFinanceOverview(props.balance, props.currency);
    }, []);

    return (
        <div className = "overview" >
            {balances}
        </div>
    );
}

FinanceDashboard.propTypes = {
    balance: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

export default FinanceDashboard;

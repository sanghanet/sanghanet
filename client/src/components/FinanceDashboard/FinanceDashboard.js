import React, { useContext } from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { formatMoney } from '../../languages/InternationalizationMethods';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as Membership } from '../icons/fin_membership.svg';
import { ReactComponent as Rent } from '../icons/fin_rent.svg';
import { ReactComponent as Event } from '../icons/fin_event.svg';
import { ReactComponent as Angel } from '../icons/fin_angel.svg';

const FinanceDashboard = (props) => {
    const { financeDashboard, financePockets } = useContext(UIcontext).dictionary;
    const { BALANCE } = financeDashboard;
    const lang = localStorage.getItem('lang');

    const { balance, currency } = props;

    const getIcon = (key) => {
        switch (key) {
            case 'membership': return <Membership />;
            case 'rent': return <Rent />;
            case 'event': return <Event />;
            case 'angel': return <Angel />;
            default: return null;
        }
    };

    return (
        <div className='overview' >
            {/* eslint-disable-next-line array-callback-return */}
            {Object.entries(balance).map(([pocket, amount, index]) => {
                try {
                    const financePocket = financePockets[pocket.toUpperCase()];

                    return (
                        <div className='outer'>
                            <div key={index} className='fin-card'>
                                <div className='fin-card-1st'>
                                    <div>{financePocket} {BALANCE}:</div>
                                    <div>{getIcon(pocket)}</div>
                                </div>
                                <div className={`fin-card-2nd ${amount >= 0 ? 'green' : 'red'}`}>
                                    <div>{formatMoney(lang, amount, currency)}</div>
                                </div>
                            </div>
                        </div>
                    );
                } catch (error) {
                    props.onError(error);
                }
            })}
        </div>
    );
};

FinanceDashboard.propTypes = {
    balance: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
    onError: PropTypes.func.isRequired
};

export default FinanceDashboard;

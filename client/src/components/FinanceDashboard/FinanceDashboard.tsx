import React, { useContext } from 'react';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { formatMoney } from '../../languages/InternationalizationMethods';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as Membership } from '../icons/fin_membership.svg';
import { ReactComponent as Rent } from '../icons/fin_rent.svg';
import { ReactComponent as Event } from '../icons/fin_event.svg';
import { ReactComponent as Angel } from '../icons/fin_angel.svg';

type FinanceDashboardProps = {
    balance: Balance;
    onError: (error: Error) => void;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ balance, onError }) => {
    const { financeDashboard, financePockets } = useContext(UIcontext).dictionary;
    const { BALANCE } = financeDashboard;
    const lang = localStorage.getItem('lang');

    const getIcon = (key: string): JSX.Element | null => {
        switch (key) {
            case 'membership': return <Membership />;
            case 'rent': return <Rent />;
            case 'event': return <Event />;
            case 'angel': return <Angel />;
            default: return null;
        }
    };

    return (
        <div className="overview" >
            <div className="outer">
                {/* eslint-disable-next-line array-callback-return */}
                {Object.entries(balance).map(([pocket, amount], index) => {
                    try {
                        const financePocket = financePockets[pocket.toUpperCase()];

                        return (
                            <div key={index} className="fin-card">
                                <div className="fin-card-1st">
                                    <div>{financePocket} {BALANCE}:</div>
                                    <div>{getIcon(pocket)}</div>
                                </div>
                                <div className={`fin-card-2nd ${amount >= 0 ? 'green' : 'red'}`}>
                                    <div>{formatMoney(lang, amount)}</div>
                                </div>
                            </div>
                        );
                    } catch (error) {
                        onError(error);
                    }
                })}
            </div>
        </div>
    );
};

FinanceDashboard.propTypes = {
    balance: PropTypes.exact({
        membership: PropTypes.number.isRequired,
        rent: PropTypes.number.isRequired,
        event: PropTypes.number.isRequired,
        angel: PropTypes.number.isRequired
    }).isRequired,
    onError: PropTypes.func.isRequired
};

export default FinanceDashboard;

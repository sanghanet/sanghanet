import React, { useContext } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './FinanceDashboard.scss';
import PropTypes from 'prop-types';
import { formatMoney } from '../../languages/InternationalizationMethods';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import { ReactComponent as Membership } from '../icons/fin_membership.svg';
import { ReactComponent as Rent } from '../icons/fin_rent.svg';
import { ReactComponent as Event } from '../icons/fin_event.svg';
import { ReactComponent as Angel } from '../icons/fin_angel.svg';
import { ReactComponent as Info } from '../icons/info.svg';

interface FinanceDashboardProps {
    balance: PocketBalance;
    onError: (error: Error) => void;
    onClick?: (pocket: string) => void;
}

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ balance, onError, onClick }) => {
    const { financeDashboard, financePockets, pocketDescription } = useContext(UIcontext).dictionary;
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

    type Pocket = 'membership' | 'rent' | 'event' | 'angel';
    type PocketDescriptions = {
        [key in Pocket]: string;
    }

    const POCKET_DESCRIPTIONS: PocketDescriptions = {
        membership: 'It is membership pocket',
        rent: 'It is rent pocket',
        event: 'It is event pocket',
        angel: 'It is angel pocket',
    };

    const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
        const { pocket } = event.currentTarget.dataset;
        onClick && pocket && onClick(pocket);
    };

    return (
        <div className="overview" >
            <div className="outer">
                {/* eslint-disable-next-line array-callback-return */}
                {Object.entries(balance).map((entry, index) => {
                    const pocket = entry[0] as Pocket;
                    const amount = entry[1] as number;
                    try {
                        const financePocket = financePockets[pocket.toUpperCase()];

                        return (
                            <OverlayTrigger
                                key={pocket}
                                placement="top"
                                overlay={
                                    <Tooltip id={`tooltip-${pocket}`}>
                                        {pocketDescription[pocket.toUpperCase()]}
                                    </Tooltip>
                                }
                                delay={500}
                                trigger={['hover', 'click']}
                            >
                                {({ ref, ...triggerHandler }) => (
                                    <div
                                        key={index}
                                        className="fin-card"
                                        onClick={handleClick}
                                        data-pocket={pocket}
                                        {...triggerHandler}
                                    >
                                        <div className="fin-card-1st">
                                            <div>
                                                <Info ref={ref} className="fin-pocket-info" />
                                                <div>{financePocket} {BALANCE}:</div>
                                            </div>
                                            <div>{getIcon(pocket)}</div>
                                        </div>
                                        <div className={`fin-card-2nd ${amount >= 0 ? 'green' : 'red'}`}>
                                            <div>{formatMoney(lang, amount)}</div>
                                        </div>
                                    </div>
                                )}
                            </OverlayTrigger>
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
    onError: PropTypes.func.isRequired,
    onClick: PropTypes.func
};

export default FinanceDashboard;

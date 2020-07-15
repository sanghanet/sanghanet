import React, { useContext } from 'react';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './LanguageSelector.scss';

const LanguageSelector = (props) => {
    const { changeLang } = useContext(UIcontext);

    const handleLanguageChange = (event) => {
        changeLang(event.target.value);
    };

    return (
        <select
            className="language-selector"
            onChange={handleLanguageChange}>
            <option value={'hu'}>Magyar</option>
            <option value={'en'}>English</option>
        </select>
    );
};

export default LanguageSelector;

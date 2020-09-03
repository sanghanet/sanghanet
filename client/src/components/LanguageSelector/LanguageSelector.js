import React, { useContext, useState } from 'react';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './LanguageSelector.scss';
import PropTypes from 'prop-types';

const LanguageSelector = (props) => {
    const defaultLang = localStorage.getItem('lang');
    const [sliderPos, setSliderPos] = useState(defaultLang === 'hu' ? 'left' : 'right');

    const { changeLang } = useContext(UIcontext);

    const handleLanguageChange = (lang) => {
        changeLang(lang);
        localStorage.setItem('lang', lang);
    };

    const handleSliderClick = () => {
        if (sliderPos === 'left') {
            setSliderPos('right');
            handleLanguageChange('en');
        } else {
            setSliderPos('left');
            handleLanguageChange('hu');
        }
    };

    return (

        <div className = {`language-selector ${props.size}`} onClick = {handleSliderClick}>
            <div className = {`lang-slider ${sliderPos}`}></div>
        </div>

    );
};

LanguageSelector.propTypes = {
    size: PropTypes.string
};

export default LanguageSelector;

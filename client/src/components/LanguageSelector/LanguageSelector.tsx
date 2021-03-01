import React, { useContext, useState } from 'react';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import './LanguageSelector.scss';
import PropTypes from 'prop-types';

interface LanguageSelectorProps {
    size?: 'small'
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ size }) => {
    const { lang, changeLang } = useContext(UIcontext);
    const [sliderPos, setSliderPos] = useState(lang === 'hu' ? 'left' : 'right');

    const handleLanguageChange = (lang: LANGUAGE) => {
        changeLang(lang);
        localStorage.setItem('lang', lang);
    };

    const handleSliderClick = ():void => {
        if (sliderPos === 'left') {
            setSliderPos('right');
            handleLanguageChange('en');
        } else {
            setSliderPos('left');
            handleLanguageChange('hu');
        }
    };

    return (

        <div className = {`language-selector ${size}`} onClick = {handleSliderClick}>
            <div className = {`lang-slider ${sliderPos}`}></div>
        </div>

    );
};

LanguageSelector.propTypes = {
    size: PropTypes.oneOf(['small'])
};

export default LanguageSelector;

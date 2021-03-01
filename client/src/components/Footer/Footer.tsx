import React, { useContext } from 'react';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import version from '../../version';
import './Footer.scss';
import LanguageSelector from '../LanguageSelector/LanguageSelector';

const Footer: React.FC = () => {
    const { MADEBY } = useContext(UIcontext).dictionary.footer;
    return (
        <footer className='footer position-absolute p-0 m-0'>
            <div className="credential-box">
                <p>{MADEBY}
                    <span>Ballo, Julia</span>
                    <span>Ballo, Miklos</span>
                    <span>Danko, Denes</span>
                    <span>Jozsa, Benjamin</span>
                    <span>Nalesnyik, Kristof</span>
                    <span>Rigo, Ildiko</span>
                </p>
            </div>
            <div className="git-box">
                <p>{ version.date }</p>
                <p>{ version.hash }</p>
            </div>
            <LanguageSelector size="small" />
        </footer>
    );
};

export default Footer;

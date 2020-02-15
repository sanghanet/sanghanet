import React from 'react';
import './Navbar_Header.scss';
import version from '../version';

const Footer = (props) => {
    return (
        <footer className='footer'>
            <div className="credential-box">
                <p>Made by:
                    <span>Ildiko Rigo</span>
                    <span>Denes Danko</span>
                    <span>Benjamin Jozsa</span>
                    <span>Miklos Ballo</span>
                </p>
            </div>
            <div>
                <p>{ version.date }</p>
                <p>{ version.hash }</p>
            </div>
        </footer>
    );
};

export default Footer;

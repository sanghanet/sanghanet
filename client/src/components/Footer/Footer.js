import React from 'react';
import version from '../../version';
import './Footer.scss';

const Footer = (props) => {
    return (
        <footer className='footer position-absolute p-0 m-0'>
            <div className="credential-box">
                <p>Made by:
                    <span>Ildiko Rigo</span>
                    <span>Denes Danko</span>
                    <span>Benjamin Jozsa</span>
                    <span>Miklos Ballo</span>
                </p>
            </div>
            <div className="git-box">
                <p>{ version.date }</p>
                <p>{ version.hash }</p>
            </div>
        </footer>
    );
};

export default Footer;

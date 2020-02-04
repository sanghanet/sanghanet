import React from 'react';
import './Navbar_Header.scss';

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
            <p>v0.0.1</p>
        </footer>
    );
};

export default Footer;

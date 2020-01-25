import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import './Profile.scss';
// import Photo from './media/myPhoto.png';

const Profile = (props) => {
    const loadFile = (event) => {
        const image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };
    return (
        <div className='grid-container'>
            <Header activePage="Profile" signOut={props.signOut} />
            <Navbar signOut={props.signOut} />
            <main>
                <form className="profile-form">
                    <div className="general-data profile-blocks">
                        <h2 className="profile-form-h2">GENERAL DATA</h2>
                        <div className="profile-form-field">
                            <input type="file" accept="image/*" name="image" id="file" onChange={loadFile}></input>
                            <label htmlFor="file" id="file-upload">
                                <p className="upload-text">Click here to<br />upload your photo</p>
                                <img id="output" className="profile-photo"/>
                            </label>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" required></input>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" required></input>
                        </div>
                        <div className="profile-form-field select-container">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" required>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="birthDate">Date of Birth</label>
                            <input type="date" id="birthDate" name="birthDate" min="1920-01-01" max="2020-01-01" required></input>
                        </div>
                    </div>
                    <div className="contact-details profile-blocks">
                        <h2 className="profile-form-h2">CONTACT DETAILS</h2>
                        <div className="profile-form-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="my.name@gmail.com" required></input>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="tel" id="mobile" name="mobile" placeholder="70/66 89 456" maxLength="20" required></input>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" placeholder="1045 Budapest, Rozsa u. 25/8"></input>
                        </div>
                        <details>
                            <summary className="profile-form-field em-name">
                                <label htmlFor="emName">Emergency contact</label>
                                <input type="text" id="emName" name="emName" placeholder="Contact Name"></input>
                            </summary>
                            <div className="profile-form-field em-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="her.name@gmail.com"></input>
                            </div>
                            <div className="profile-form-field em-field">
                                <label htmlFor="emMobile" className="em-mobile-lable">Mobile</label>
                                <input type="tel" id="emMobile" name="emMobile" placeholder="70/77 23 456" maxLength="20"></input>
                            </div>
                        </details>
                    </div>
                    <div className="yoga-ranking profile-blocks">
                        <h2 className="profile-form-h2">YOGA RANKING</h2>
                        <div className="profile-form-field">
                            <label htmlFor="meditation">Meditation score</label>
                            <input type="number" id="meditation" name="meditation" min="1" max="100"></input>
                        </div>
                        <div className="profile-form-field">
                            <label htmlFor="sheva">Sheva score</label>
                            <input type="number" id="sheva" name="sheva" min="1" max="100"></input>
                        </div>
                        <div className="profile-form-field select-container">
                            <label htmlFor="martial-art">Martial Art Belt</label>
                            <select id="martial-art">
                                <option className="white-belt">White</option>
                                <option className="yellow-belt">Yellow</option>
                                <option className="orange-belt">Orange</option>
                                <option className="green-belt">Green</option>
                                <option className="blue-belt">Blue</option>
                                <option className="brown-belt">Brown</option>
                                <option className="black-belt">Black</option>
                            </select>
                        </div>
                        <details>
                            <summary className="profile-form-field em-name">
                                <label className="books">Books</label>
                            </summary>
                            <div className="profile-form-field em-field">
                                <input type="text" id="book" name="book" placeholder="Author and title of the book..."></input>
                            </div>
                            <div className="profile-form-field em-field">
                                <input type="text" id="book" name="book" placeholder="Author and title of the book..."></input>
                            </div>
                        </details>
                    </div>
                </form>
            </main>
        </div>
    );
};

Profile.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default Profile;

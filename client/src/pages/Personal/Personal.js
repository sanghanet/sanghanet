import React from 'react';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import './Personal.scss';
import ArrowDown from '../../components/icons/arrow-down.svg';
import ArrowUp from '../../components/icons/arrow-up.svg';
import Plus from '../../components/icons/plus.svg';

class Personal extends React.Component {
    state = {
        openDetails: false
    }

    componentDidMount () {
        const detailsTags = document.getElementsByTagName('details');
        for (let i = 0; i < detailsTags.length; i++) {
            detailsTags[i].addEventListener('click', (e) => {
                e.preventDefault();
            });
        }
    }

    loadFile = (event) => {
        const image = document.getElementById('output');
        image.src = URL.createObjectURL(event.target.files[0]);
    };

    toggleDetails = (event) => {
        this.setState((state) => ({ openDetails: !state.openDetails }));
        const image = event.currentTarget.lastElementChild;
        image.src = this.state.openDetails ? ArrowUp : ArrowDown;
    };

    render () {
        return (
            <div>
                <Header activePage="Personal" />
                <Navbar />
                <main>
                    <form className="personal-form">
                        <div className="general-data personal-blocks">
                            <h2 className="personal-form-h2">GENERAL DATA</h2>
                            <div className="personal-form-field avatar">
                                <input type="file" accept="image/*" name="image" id="file" onChange={this.loadFile}></input>
                                <label htmlFor="file" id="file-upload">
                                    <p className="upload-text">Click here to<br />upload your photo</p>
                                    <img id="output" className="personal-photo" alt=""></img>
                                </label>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" required></input>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" required></input>
                            </div>
                            <div className="personal-form-field select-container">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" required>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="birthDate">Date of Birth</label>
                                <input type="date" id="birthDate" name="birthDate" min="1920-01-01" max="2020-01-01" required></input>
                            </div>
                        </div>
                        <div className="contact-details personal-blocks">
                            <h2 className="personal-form-h2">CONTACT DETAILS</h2>
                            <div className="personal-form-field">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" placeholder="my.name@gmail.com" required></input>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="tel" id="mobile" name="mobile" placeholder="70/66 89 456" maxLength="20" required></input>
                            </div>
                            <div className="personal-form-field">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" placeholder="1045 Budapest, Rozsa u. 25/8"></input>
                            </div>
                            <details open={this.state.openDetails}>
                                <summary className="personal-form-field em-name">
                                    <label htmlFor="emName" onClick={this.toggleDetails}>
                                        Emergency contact
                                        <img src={ArrowUp} className="arrow" alt=""></img>
                                    </label>
                                    <input type="text" id="emName" name="emName" placeholder="Contact Name"></input>
                                </summary>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="em-email">Email</label>
                                    <input type="email" id="em-email" name="em-email" placeholder="her.name@gmail.com"></input>
                                </div>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="emMobile" className="em-mobile-lable">Mobile</label>
                                    <input type="tel" id="emMobile" name="emMobile" placeholder="70/77 23 456" maxLength="20"></input>
                                </div>
                            </details>
                        </div>
                        <div className="yoga-ranking personal-blocks">
                            <h2 className="personal-form-h2">YOGA RANKING</h2>
                            <div className="personal-form-field">
                                <label htmlFor="meditation">Meditation score</label>
                                <input type="number" id="meditation" name="meditation" min="1" max="100"></input>
                            </div>
                            <div className="personal-form-field select-container">
                                <label htmlFor="martial-art">Martial Art Belt</label>
                                <select id="martial-art">
                                    <option value="white" className="white-belt">White</option>
                                    <option value="yellow" className="yellow-belt">Yellow</option>
                                    <option value="orange" className="orange-belt">Orange</option>
                                    <option value="green" className="green-belt">Green</option>
                                    <option value="blue" className="blue-belt">Blue</option>
                                    <option value="brown" className="brown-belt">Brown</option>
                                    <option value="black" className="black-belt">Black</option>
                                </select>
                            </div>
                            <details open={this.state.openDetails}>
                                <summary className="personal-form-field em-name">
                                    <label htmlFor="book" onClick={this.toggleDetails}>
                                        Books
                                        <img src={ArrowUp} className="arrow" alt=""></img>
                                    </label>
                                </summary>
                                <div className="personal-form-field em-field">
                                    <label htmlFor="book" className="books">
                                        Click to add a new book...
                                        <img src={Plus} alt="" className="plus"></img>
                                    </label>
                                </div>
                                <div className="personal-form-field em-field">
                                    <input type="text" id="book" name="book" placeholder="Author and title of the book..."></input>
                                </div>
                                <div className="personal-form-field em-field">
                                    <input type="text" name="book" placeholder="Author and title of the book..."></input>
                                </div>
                            </details>
                        </div>
                    </form>
                </main>
                <Footer />
            </div>
        );
    };
}

export default Personal;

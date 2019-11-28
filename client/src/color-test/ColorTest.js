import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProfilePic from './images/profile_pic.png';

function ColorTest () {
    return (
        <div className="color-test">
            <header>
                <h1 className="page-title">SanghaNet</h1>
                <div className="search-bar-grid">
                    <div>
                        <FontAwesomeIcon
                            className="search-icon"
                            icon={faSearch}
                        />
                    </div>
                    <input type="text" placeholder=" Search..."/>
                </div>
                <nav>
                    <a href="#">HOME</a>
                    <a href="#">PROFILE</a>
                    <a href="#">STATS</a>
                </nav>
                <div>
                    <label className="switch">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </header>

            <main>
                <div className="profile">
                    <div className="profile-pic">
                        <div>
                            <img src={ProfilePic} />
                        </div>
                    </div>
                    <div className="profile-pic-caption">
                        <h3>John Doe</h3>
                        <h3>Programmer</h3>
                    </div>
                </div>
                <div className="personal-info">
                    <div className="text-box">
                        <h2>Personal information</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Error laboriosam id possimus harum molestiae delectus quis dolor,
                            dolorum provident amet? Nam esse nulla dolorem iste totam, error
                            harum ipsum eveniet!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Error laboriosam id possimus harum molestiae delectus quis dolor,
                            dolorum provident amet? Nam esse nulla dolorem iste totam, error
                            harum ipsum eveniet!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Error laboriosam id possimus harum molestiae delectus quis dolor,
                            dolorum provident amet? Nam esse nulla dolorem iste totam, error
                            harum ipsum eveniet!
                        </p>
                    </div>
                    <div>
                        <a className="edit-button">
                            <FontAwesomeIcon
                                className="edit-icon"
                                icon={faEdit}
                            />
                            EDIT
                        </a>
                    </div>
                </div>
            </main>
            <footer>
                <h3>Hello World!</h3>
            </footer>
        </div>
    );
}

export default ColorTest;

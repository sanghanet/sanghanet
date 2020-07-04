import React from 'react';
import './Members.scss';
import ProfilePhoto from './images/myPhoto.png';

const Members = (props) => {
    return (
        <div className="card-container">
            <div className="member-card">
                <div className="profile-img">
                    <img src={ProfilePhoto} alt="Profile photo" />
                </div>
                <p className="card-name">Benjamin Jozsa Yoda</p>
                <hr className="card-line"></hr>
                <p className="card-spiritual-name">Baby Yoda</p>
                <button>See shared data</button>
            </div>
            <div className="member-card">
                <div className="profile-img">
                    <img src={ProfilePhoto} alt="Profile photo" />
                </div>
                <p className="card-name">Benjamin Jozsa Yoda</p>
                <hr className="card-line"></hr>
                <p className="card-spiritual-name">Baby Yoda</p>
                <button>See shared data</button>
            </div>
        </div>
    );
};

export default Members;

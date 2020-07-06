import React, { useState, useEffect } from 'react';
import Client from '../../components/Client';
import './Members.scss';
import ProfilePhoto from './images/myPhoto.png';

const Members = (props) => {
    // const [members, setMembers] = useState([]);

    useEffect(() => {
        Client.fetch('/user/allregisteredusers', { method: 'POST' })
            .then((data) => {
                console.dir(data);
            }).catch((err) => {
                console.log(err);
                // this.setState({ showAlert: true, alertMessage: err.message, alertType: 'Error' });
            });
    }, []); //  to run an effect and clean it up only once

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
        </div>
    );
};

export default Members;

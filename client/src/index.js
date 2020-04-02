import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

let navbarScrollPos = 0;
const navbarScrollPosUpdate = (newScrollPos) => {
    navbarScrollPos = newScrollPos;
    console.log(newScrollPos);
};

ReactDOM.render(<App navbarScrollPos={navbarScrollPos} navbarScrollPosUpdate={navbarScrollPosUpdate}/>, document.getElementById('root'));

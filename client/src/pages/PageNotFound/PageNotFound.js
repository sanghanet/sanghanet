import React from 'react';
import './PageNotFound.scss';
import NotFoundImg from '../../components/icons/not_found.png';

const PageNotFound = (props) => {
    return (
        <div className='not-found-page'>
            <h1>PAGE NOT FOUND</h1>
            <img src={NotFoundImg} />
        </div>
    );
};

export default PageNotFound;

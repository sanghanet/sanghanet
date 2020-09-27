import React from 'react';
import './PageNotFound.scss';
import NotFoundImg from '../../components/icons/not_found.png';
import Button from 'react-bootstrap/Button';
import { ReactComponent as BackIcon } from '../../components/icons/arrow-left.svg';

const goBack = () => {
    window.location.href = 'app/personal';
};

const PageNotFound = (props) => {
    return (
        <div className='not-found-page'>
            <div className='container'>
                <Button variant="primary" onClick={goBack}>
                    <BackIcon />
                    <h6>Go Back</h6>
                </Button>
                <h1>PAGE NOT FOUND</h1>
            </div>
            <img src={NotFoundImg} alt='page not found' />
        </div>
    );
};

export default PageNotFound;

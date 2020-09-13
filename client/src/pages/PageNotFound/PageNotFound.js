import React from 'react';
import './PageNotFound.scss';
import NotFoundImg from '../../components/icons/not_found.png';
import GoBack from 'react-bootstrap/Button';
import { ReactComponent as BackIcon } from '../../components/icons/arrow-left.svg';

const goBack = () => window.history.back();

const PageNotFound = (props) => {
    return (
        <div className='not-found-page'>
            <h1>PAGE NOT FOUND</h1>
            <GoBack variant="primary" onClick={goBack}>
                <BackIcon />
                <h3>Go Back</h3>
            </GoBack>
            <img src={NotFoundImg} alt='page not found' />
        </div>
    );
};

export default PageNotFound;

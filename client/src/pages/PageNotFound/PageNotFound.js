import React, { useContext } from 'react';
import './PageNotFound.scss';
import NotFoundImg from '../../components/icons/not_found.png';
import Button from 'react-bootstrap/Button';
import { ReactComponent as BackIcon } from '../../components/icons/arrow-left.svg';
import { UIcontext } from '../../components/contexts/UIcontext/UIcontext';

const goBack = () => {
    window.location.href = 'app/';
};

const PageNotFound = (props) => {
    const { PAGENOTFOUND, GOBACK } = useContext(UIcontext).dictionary.pageNotFound;

    return (
        <div className='not-found-page'>
            <div className='text-container'>
            <h1>{PAGENOTFOUND}</h1>
                <Button variant="dark" onClick={goBack}>
                    <BackIcon />
                    <p>{GOBACK}</p>
                </Button>
            </div>
            <img src={NotFoundImg} alt='page not found' />
        </div>
    );
};

export default PageNotFound;

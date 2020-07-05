/* eslint-disable no-multi-spaces */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Dashboard from '../pages/Dashboard/Dashboard';
import Personal from '../pages/Personal/Personal';
import Yoga from '../pages/Yoga/Yoga';
import Finances from '../pages/Finances/Finances';
import Events from '../pages/Events/Events';
import Questions from '../pages/Questions/Questions';
import Queries from '../pages/Queries/Queries';
import AdminFinance from '../pages/Admins/AdminFinance/AdminFinance';
import AdminEvent from '../pages/Admins/AdminEvent/AdminEvent';
import AdminYoga from '../pages/Admins/AdminYoga/AdminYoga';
import Superuser from '../pages/Admins/Superuser/Superuser';

const Main = () => {
    const [pageName, setPageName] = useState('');

    const location = useLocation();

    useEffect(() => {
        const url = location.pathname;
        const pageName = url.substring(url.lastIndexOf('/') + 1);
        let pageNameCapitalized = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        pageNameCapitalized += url.includes('/app/admin') && !url.includes('/superuser') ? ' Admin' : '';

        setPageName(pageNameCapitalized);
    }, [location]);

    return (
        <div className='grid-container'>
            <Header activePage={pageName} />
            <Navbar navStyle="sidenav" />
            <main className="align">
                <Switch>
                    <Route exact path='/app/dashboard' render={(props) =>       <Dashboard {...props} /> } />
                    <Route exact path='/app/personal' render={(props) =>        <Personal {...props} /> } />
                    <Route exact path='/app/yoga' render={(props) =>            <Yoga {...props} /> } />
                    <Route exact path='/app/finances' render={(props) =>        <Finances {...props} /> } />
                    <Route exact path='/app/events' render={(props) =>          <Events {...props} /> } />
                    <Route exact path='/app/questions' render={(props) =>       <Questions {...props} /> } />
                    <Route exact path='/app/queries' render={(props) =>         <Queries {...props} /> } />

                    <Route exact path='/app/admin/finance' render={(props) =>   <AdminFinance {...props} /> } />
                    <Route exact path='/app/admin/event' render={(props) =>     <AdminEvent {...props} /> } />
                    <Route exact path='/app/admin/yoga' render={(props) =>      <AdminYoga {...props} /> } />
                    <Route exact path='/app/admin/superuser' render={(props) => <Superuser {...props} /> } />

                    <Route exact path='/app/'>
                        <Redirect to='/app/personal' />
                    </Route>

                    <Redirect to='/404' />
                </Switch>
            </main>
            <Footer />
        </div>
    );
};

export default Main;

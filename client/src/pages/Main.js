import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

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

class Main extends Component {
    render () {
        return (
            <div className='grid-container'>
                <Header activePage="Yoga" />
                <Navbar navStyle="sidenav" />
                <main className="align">
                    <Route path='/app/dashboard' render={ (props) => <Dashboard {...props} /> } />
                    <Route path='/app/personal' render={ (props) => <Personal {...props} /> } />
                    <Route path='/app/yoga' render={ (props) => <Yoga {...props} /> } />
                    <Route path='/app/finances' render={ (props) => <Finances {...props} /> } />
                    <Route path='/app/events' render={ (props) => <Events {...props} /> } />
                    <Route path='/app/questions' render={ (props) => <Questions {...props} /> } />
                    <Route path='/app/queries' render={ (props) => <Queries {...props} /> } />

                    <Route path='/app/admin/finance' render={ (props) => <AdminFinance {...props} /> } />
                    <Route path='/app/admin/event' render={ (props) => <AdminEvent {...props} /> } />
                    <Route path='/app/admin/yoga' render={ (props) => <AdminYoga {...props} /> } />
                    <Route path='/app/admin/superuser' render={ (props) => <Superuser {...props} /> } />

                    <Route exact path='/app/'>
                        <Redirect to='/app/personal' />
                    </Route>
                </main>
                <Footer />
            </div>
        );
    }
};

export default Main;

/* eslint-disable no-multi-spaces */
import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Dashboard from './Dashboard/Dashboard';
import Personal from './Personal/Personal';
import Yoga from './Yoga/Yoga';
import Finances from './Finances/Finances';
import Events from './Events/Events';
import Members from './Members/Members';
import Questions from './Questions/Questions';
import Queries from './Queries/Queries';
import AdminFinance from './Admins/AdminFinance/AdminFinance';
import AdminEvent from './Admins/AdminEvent/AdminEvent';
import AdminYoga from './Admins/AdminYoga/AdminYoga';
import Superuser from './Admins/Superuser/Superuser';

const Main: React.FC<RouteComponentProps> = () => {
    return (
        <div className="grid-container">
            <Header />
            <Navbar navStyle="sidenav" />
            <main className="align">
                <Switch>
                    <Route exact path="/app/dashboard" render={(props): React.ReactNode => <Dashboard {...props} />} />
                    <Route exact path="/app/personal" render={(props): React.ReactNode => <Personal {...props} />} />
                    <Route exact path="/app/yoga" render={(props): React.ReactNode => <Yoga {...props} />} />
                    <Route exact path="/app/finances" render={(props): React.ReactNode => <Finances {...props} />} />
                    <Route exact path="/app/events" render={(props): React.ReactNode => <Events {...props} />} />
                    <Route exact path="/app/members" render={(props): React.ReactNode => <Members {...props} />} />
                    <Route exact path="/app/questions" render={(props): React.ReactNode => <Questions {...props} />} />
                    <Route exact path="/app/queries" render={(props): React.ReactNode => <Queries {...props} />} />

                    <Route exact path="/app/admin/finance" render={(props): React.ReactNode => <AdminFinance {...props} />} />
                    <Route exact path="/app/admin/event" render={(props): React.ReactNode => <AdminEvent {...props} />} />
                    <Route exact path="/app/admin/yoga" render={(props): React.ReactNode => <AdminYoga {...props} />} />
                    <Route exact path="/app/admin/superuser" render={(props): React.ReactNode => <Superuser {...props} />} />

                    <Route exact path="/app/">
                        <Redirect to="/app/personal" />
                    </Route>

                    <Redirect to="/404" />
                </Switch>
            </main>
            <Footer />
        </div>
    );
};

export default Main;

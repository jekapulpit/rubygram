import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import store from './store'
import Menu from './components/Menu'
import Login from './components/users/Login'
import Profile from './components/users/Profile'
import RoomContent from './components/rooms/RoomContent'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from "./constants";
import ActiveRoom from "./components/rooms/ActiveRoom";
import UsersSettings from "./components/settings/UsersSettings";
import NotificationsContent from "./components/notifications/NotificationsContent";
import {syncCurrentUser} from "./services/authentificationService";
import {getCurrentUser} from "./services/sessionStorageServices";

ReactDOM.render(
    <Provider store={store}>
        <ActionCableProvider url={API_WS_ROOT}>
        <Router>
            <Route path="/home" render={() => (
                syncCurrentUser() ?
                null
                :
                (<Redirect to="/login"/>)
            )}/>
            <Route path="/home" component={Menu} />
            <Route exact path="/home/rooms" component={RoomContent} />
            <Route exact path="/home/notifications" component={NotificationsContent} />
            <Route exact path="/home/rooms/:id" component={ActiveRoom} />
            <Route exact path="/home/profile/:id" component={Profile} />
            <Route exact path="/home/settings/users" render={() => (
                getCurrentUser().admin ?
                    <UsersSettings />
                    :
                    (<Redirect to="/home/rooms"/>)
            )} />
            <Route exact path="/home/settings/rooms" render={() => (
                getCurrentUser().admin ?
                    null
                    :
                    (<Redirect to="/home/rooms"/>)
            )} />
            <Route exact path="/login" component={Login} />
        </Router>

        </ActionCableProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

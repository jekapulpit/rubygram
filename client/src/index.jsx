import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import store from './store'
import Menu from './components/Menu'
import Login from './components/users/Login'
import RoomContent from './components/rooms/RoomContent'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import {getCurrentUser} from "./services/sessionStorageServices";
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from "./constants";
import ActiveRoom from "./components/rooms/ActiveRoom";
import NotificationsContent from "./components/notifications/NotificationsContent";

ReactDOM.render(
    <Provider store={store}>
        <ActionCableProvider url={API_WS_ROOT}>
        <Router>
            <Route path="/" render={() => (
                getCurrentUser() ?
                null
                :
                (<Redirect to="/login"/>)
            )}/>
            <Route path="/home" component={Menu} />
            <Route exact path="/home/rooms" component={RoomContent} />
            <Route exact path="/home/notifications" component={NotificationsContent} />
            <Route exact path="/home/rooms/:id" component={ActiveRoom} />
            <Route exact path="/login" component={Login} />
        </Router>
        </ActionCableProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

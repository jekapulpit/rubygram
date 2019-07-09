import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import * as serviceWorker from './serviceWorker';
import store from './store'
import Menu from './components/Menu'
import RoomContent from './components/rooms/RoomContent'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={Menu} />
            <Route path="/rooms" component={RoomContent} />
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

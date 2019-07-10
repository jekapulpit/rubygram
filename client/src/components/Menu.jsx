import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../stylesheets/components/menu.scss'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {logout} from "../services/authentificationService";
import {getCurrentUser} from "../services/sessionStorageServices";

const Menu = props => {
    return (
        <AppBar id="navbar-menu" position="relative">
            <p>You logged in as {getCurrentUser().username}, <span onClick={() => logout()}>log out</span></p>
            <Tabs>
                <Tab component={Link} to="/home/rooms" label="Room List" />
                <Tab component={Link} to="/home/profile" label="Profile" />
            </Tabs>
        </AppBar>
    )
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {}
};

const mapStateToProps = state => ({
    currentUser: state.users.currentUser
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Menu));
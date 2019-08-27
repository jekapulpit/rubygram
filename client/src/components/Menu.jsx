import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../stylesheets/components/menu.scss'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {logout} from "../services/authentificationService";
import NotificationsCable from "./notifications/NotificationsCable";

const Menu = props => {
    return (
        <AppBar id="navbar-menu" position="relative">
            <p className='profile-header'>You logged in as {props.currentUser.username} <p className='clickable-link' onClick={() => logout()}>log out</p></p>
            <Tabs value={window.location.pathname}>
                <Tab
                    value={"/home/rooms"}
                    component={Link}
                    to="/home/rooms"
                    label={`Room List${props.currentUser.unread_number > 0 ? ` (${props.currentUser.unread_number})` : ''}`} />
                <Tab
                    value={"/home/notifications"}
                    component={Link}
                    to="/home/notifications"
                    label={`Notifications${props.currentUser.unread_notifications > 0 ? ` (${props.currentUser.unread_notifications})` : ''}`} />
                {
                    props.currentUser.admin ? (
                        <Tab value={"/home/settings/rooms"} component={Link} to="/home/settings/rooms" label="rooms settings" />
                    ) : (null)
                }
                {
                    props.currentUser.admin ? (
                        <Tab value={"/home/settings/users"} component={Link} to="/home/settings/users" label="users settings" />
                    ) : (null)
                }
                <Tab value={`/home/profile/${props.currentUser.id}`} component={Link} to={`/home/profile/${props.currentUser.id}`} label="Profile" />
            </Tabs>
            <NotificationsCable/>
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
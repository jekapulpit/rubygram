import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import {Link} from "react-router-dom";

const User = props => {
    let fill = props.user.admin ? (
        <Link className={'clickable-link'} to={`/home/profile/${props.user.id}`}>{props.user.username}, chat limit: infinite</Link>
    ) : (
        <React.Fragment>
            <Link className={'clickable-link'} to={`/home/profile/${props.user.id}`}>{props.user.username}, chat limit: {props.user.max_chats}</Link>
            <button className="btn empty" onClick={() => props.handleGivePrivileges(props.user.id)}>set as moderator</button>
            <button className="btn accept" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats + 1)}>more</button>
            <button className="btn reject" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats - 1)}>less</button>
        </React.Fragment>
    );
    return (
        <div className="invite">
            <div className="invite-controls">
                {fill}
            </div>
        </div>
    )
};

export default hot(User);
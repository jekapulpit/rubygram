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
            <button className="btn accept" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats + 1)}>+</button>
            <button className="btn reject" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats - 1)}>-</button>
            <button className="btn empty" onClick={() => props.handleGivePrivileges(props.user.id)}>make a moderator</button>
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
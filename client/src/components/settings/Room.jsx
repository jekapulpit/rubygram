import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'

const Room = props => {
    let fill = props.room.admins ? (
        <p>{props.room.name}, members limit: infinite</p>
    ) : (
        <React.Fragment>
            {props.room.name}, members limit: {props.room.max_users}
            <button className="btn accept" onClick={() => props.handleChangeSettings(props.room.id, props.room.max_users + 1)}>+</button>
            <button className="btn reject" onClick={() => props.handleChangeSettings(props.room.id, props.room.max_users - 1)}>-</button>
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

export default hot(Room);
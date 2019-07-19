import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'

const User = props => {
    return (
        <div className="invite">
            {props.user.username}, chat limit: {props.user.max_chats}
            <div className="invite-controls">
                <button className="btn accept" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats + 1)}>more</button>
                <button className="btn reject" onClick={() => props.handleChangeSettings(props.user.id, props.user.max_chats - 1)}>less</button>
            </div>
        </div>
    )
};

export default hot(User);
import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'

const Invite = props => {
    return (
        <div className="invite">
            {props.invite.content}
            <div className="invite-controls">
                <button className="btn accept" onClick={() => props.handleAcceptInvite(props.invite.id)}>accept</button>
                <button className="btn reject" onClick={() => props.handleRejectInvite(props.invite.id)}>reject</button>
                <button className="btn empty" onClick={() => props.handleIgnoreUser(props.invite.room_id)}>reject and ignore</button>
            </div>
        </div>
    )
};

export default hot(Invite);
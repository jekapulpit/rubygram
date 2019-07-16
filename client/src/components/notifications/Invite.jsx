import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'

const Invite = props => {
    return (
        <div className="invite">
            {props.invite.content}
            <button onClick={() => props.handleAcceptInvite(props.invite.id)}>accept</button>
            <button onClick={() => props.handleRejectInvite(props.invite.id)}>reject</button>
        </div>
    )
};

export default hot(Invite);
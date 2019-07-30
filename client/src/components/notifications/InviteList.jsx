import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import Invite from "./Invite";

const InviteList = props => {
    let invites = props.inviteList.map((invite) => {
        return (
            <Invite
                handleIgnoreUser={props.handleIgnoreUser}
                handleAcceptInvite={props.handleAcceptInvite}
                handleRejectInvite={props.handleRejectInvite}
                invite={invite}
                key={invite.id} />
        )
    });
    return (
        <div className='invite-list'>
            {invites}
        </div>
    )
};

export default hot(InviteList);
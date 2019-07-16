import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import { invites } from "../../actionTypes";
import {connect} from "react-redux";
import {acceptInvite, getUserInvites, rejectInvite} from "../../services/invitesServices";
import Invite from './Invite'

class NotificationsContent extends React.Component {
    componentDidMount() {
        getUserInvites()
            .then((data) => {
                 this.props.toggleSetInviteList(data.invites)
            })
    }

    handleAcceptInvite = (inviteId) => {
        acceptInvite(inviteId)
            .then((data) => {
                this.props.toggleAcceptInvite(inviteId)
            })
    };

    handleRejectInvite = (inviteId) => {
        rejectInvite(inviteId)
            .then((data) => {
                this.props.toggleRejectInvite(inviteId)
            })
    };

    render () {
        let invites = this.props.inviteList.map((invite) => {
           return (
               <Invite
                   handleAcceptInvite={this.handleAcceptInvite}
                   handleRejectInvite={this.handleRejectInvite}
                   invite={invite}
                   key={invite.id} />
           )
        });
        return (
            <div className='content-container'>
                {invites}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    inviteList: state.invites.inviteList,
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetInviteList: (inviteList) => {
            dispatch({ type: invites.SET_LIST, invites: inviteList })
        },
        toggleAcceptInvite: (inviteId) => {
            dispatch({ type: invites.ACCEPT, inviteId: inviteId })
        },
        toggleRejectInvite: (inviteId) => {
            dispatch({ type: invites.REJECT, inviteId: inviteId })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(NotificationsContent));
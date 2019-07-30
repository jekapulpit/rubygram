import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import { invites } from "../../actionTypes";
import {connect} from "react-redux";
import {acceptInvite, getUserInvites, rejectInvite, readInvites} from "../../services/invitesServices";
import InviteList from "./InviteList";
import {ignoreUserByRoom} from "../../services/usersServices";

class NotificationsContent extends React.Component {
    componentDidMount() {
        getUserInvites()
            .then((data) => {
                 this.props.toggleSetInviteList(data.invites)
            })
            .then(() => readInvites())
    }

    handleAcceptInvite = (inviteId) => {
        acceptInvite(inviteId)
            .then((data) => {
                this.props.toggleAcceptInvite(inviteId)
            })
    };

    handleIgnoreUser = (roomId) => {
        ignoreUserByRoom(roomId)
            .then((data) => {
                if(data.success)
                    this.props.toggleUpdateList(data.deleted_invites)
            })
    };

    handleRejectInvite = (inviteId) => {
        rejectInvite(inviteId)
            .then((data) => {
                this.props.toggleRejectInvite(inviteId)
            })
    };

    render () {
        return (
            <div className='content-container'>
                <InviteList inviteList={this.props.inviteList}
                            handleIgnoreUser={this.handleIgnoreUser}
                            handleAcceptInvite={this.handleAcceptInvite}
                            handleRejectInvite={this.handleRejectInvite}/>
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
        },
        toggleUpdateList: (deletedInvites) => {
            dispatch({ type: invites.UPDATE, deletedInvites: deletedInvites })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(NotificationsContent));
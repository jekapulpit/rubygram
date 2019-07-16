import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import { invites } from "../../actionTypes";
import {connect} from "react-redux";
import {getUserInvites} from "../../services/invitesServices";

class NotificationsContent extends React.Component {
    componentDidMount() {
        getUserInvites()
            .then((data) => {
                 this.props.toggleSetInviteList(data.invites)
            })
    }

    render () {
        let invites = this.props.inviteList.map((invite) => {
           return (
               <div key={invite.id}>{invite.content}</div>
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
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(NotificationsContent));
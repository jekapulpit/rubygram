import React from "react"
import {sendInvite} from "../../services/invitesServices";

const UserResult = props => {
    let inviteStatus;
    switch (props.userInfo.invite_status) {
        case "sent":
            inviteStatus = (<p className="sent">sent</p>);
            break;
        case "accepted":
            inviteStatus = (<p className="accepted">accepted</p>);
            break;
        case "rejected":
            inviteStatus = (<p className="rejected">rejected</p>);
            break;
        default:
            inviteStatus = (<button onClick={() => {
                sendInvite(props.userInfo.id, props.room.id, 'hello')
                    .then((data) => {
                        if(data.success)
                            props.toggleSendInvite(props.userInfo.id);
                    })
            }}>invite</button>)
    }
    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.username}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
              {inviteStatus}
          </div>
        </div>
    );
};

export default UserResult

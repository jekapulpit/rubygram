import React from "react"
import {cancelInvite, sendInvite} from "../../services/invitesServices";
import {getCurrentUser} from "../../services/sessionStorageServices";
import {Link} from "react-router-dom";

const UserResult = props => {
    let inviteStatus;
    switch (props.userInfo.invite_status) {
        case "sent":
            inviteStatus = (<button onClick={() => {
                    cancelInvite(props.userInfo.id, props.room.id)
                        .then((data) => {
                            if(data.success) {
                                props.toggleCancelInvite(props.userInfo.id);
                                if (!getCurrentUser().admin)
                                    props.toggleIncrementSlots();
                            }
                        })
                }
            }
                className="btn empty">cancel invite</button>);
            break;
        case "accepted":
            inviteStatus = (<button className="btn accept">accepted</button>);
            break;
        case "ignoring":
            inviteStatus = (<button className="btn reject">user ignores you</button>);
            break;
        case "rejected":
            inviteStatus = (<button className="btn reject">rejected</button>);
            break;
        default:
            inviteStatus = (<button className="btn neutral" onClick={() => {
                sendInvite(props.userInfo.id, props.room.id, `User ${getCurrentUser().username} invites you to his chat "${props.room.name}"!`)
                    .then((data) => {
                        if(data.success) {
                            props.toggleSendInvite(props.userInfo.id);
                            if (!getCurrentUser().admin)
                                props.toggleDecrementSlots();
                        }
                    })
            }}>invite</button>)
    }
    return (
        <div className="result">
          <div className="person-data">
              <Link to={'/home/profile/' + props.userInfo.id}>
                <h2>{props.userInfo.username}</h2>
              </Link>
              <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
              {inviteStatus}
          </div>
        </div>
    );
};

export default UserResult

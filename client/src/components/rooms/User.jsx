import React from "react"
import {getCurrentUser} from "../../services/sessionStorageServices";

const User = props => {
    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.username}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
              {
                  (props.userInfo.id !== props.room.creator && getCurrentUser().id === props.room.creator) ?
                      <button onClick={() => {props.handleUnsubscribe(props.room.id, props.userInfo.id)}}>delete user</button> : null
              }
          </div>
        </div>
    );
};

export default User

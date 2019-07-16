import React from "react"

const User = props => {
    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.username}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
            <button>delete user</button>
          </div>
        </div>
    );
};

export default User

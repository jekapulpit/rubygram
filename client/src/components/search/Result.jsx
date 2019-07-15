import React from "react"
import PropTypes from "prop-types"
const Result = props => {
    let acceptance = {};
    if (props.userInfo.invited) {
        acceptance = (<p className={props.userInfo.invited.status}>{props.userInfo.invited.status}</p>);
    } else if (props.userInfo.accepted) {
        acceptance = (<p className="accepted">accepted</p>);
    }
    else
        acceptance = (<button onClick={() => {props.inviteUser(props.userInfo.id, 'dasdaasda')}}>invite</button>);

    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.full_name}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
            {acceptance}
          </div>
        </div>
    );
};

export default Result

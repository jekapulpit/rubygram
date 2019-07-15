import React from "react"
import PropTypes from "prop-types"
const Result = props => {
    return (
        <div className="result">
          <div className="person-data">
            <h2>{props.userInfo.username}</h2>
            <p>{props.userInfo.email}</p>
          </div>
          <div className="invite-button">
              <button>invite</button>
          </div>
        </div>
    );
};

export default Result

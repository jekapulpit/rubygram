import React from "react"

const Notification = props => {
    return (
      <div style={props.style} className="self-message center">
        <div className="notification">
          {props.message.content}
        </div>
      </div>
    );
};

export default Notification

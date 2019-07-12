import React from "react"

const Message = props => {
    return (
        <div className={props.message ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.message.sender}</div>
              {props.message.content}
              <div className="sended">{props.message.created_at}</div>
          </div>
        </div>
    );
};

export default Message

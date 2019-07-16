import React from "react"
import {getCurrentUser} from "../../services/sessionStorageServices";

const Message = props => {
    return (
        <div className={props.message.sender_id === getCurrentUser().id ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.message.sender}</div>
              {props.message.content}
              <div className="sended">{props.message.created_at}</div>
          </div>
        </div>
    );
};

export default Message

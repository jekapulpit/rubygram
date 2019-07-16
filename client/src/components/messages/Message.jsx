import React from "react"
import {getCurrentUser} from "../../services/sessionStorageServices";

const Message = props => {
    return (
        <div className={props.message.sender_id === getCurrentUser().id ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.message.senders_name}</div>
              {props.message.content}
              <div className="sended">{props.message.send_time}</div>
          </div>
        </div>
    );
};

export default Message

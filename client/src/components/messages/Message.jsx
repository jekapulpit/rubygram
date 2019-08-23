import React from "react"
import {getCurrentUser} from "../../services/sessionStorageServices";
import ClearIcon from '@material-ui/icons/Clear';

const Message = props => {
    return (
        <div style={props.style} className={props.message.sender_id === getCurrentUser().id ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.message.senders_name}</div>
              {props.message.content}
              <div className="sended">{props.message.send_time}</div>
              {props.message.sender_id === getCurrentUser().id ?
                  <div className='delete-but' onClick={() => props.handleDeleteMessage(props.message.id)}><ClearIcon/></div> : null}
          </div>
        </div>
    );
};

export default Message

import React from "react"
import ClearIcon from '@material-ui/icons/Clear';

const Message = props => {
    return (
        <div
            style={props.style}
            className={(props.message.sender_id === props.currentUser.id) ? "self-message" : "partner-message"}>
          <div className="message">
              <div className="sender">{props.message.errorState ? 'sender: error' : props.message.senders_name}</div>
              {props.message.content}
              <div className="sended">{props.message.errorState ? 'send time: error' : props.message.send_time}</div>
              {props.message.sender_id === props.currentUser.id ?
                  <div className='delete-but' onClick={() => props.handleDeleteMessage(props.message)}><ClearIcon/></div> : null}
          </div>
        </div>
    );
};

export default Message

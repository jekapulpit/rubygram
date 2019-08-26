import React from "react"
import {getCurrentUser} from "../../services/sessionStorageServices";
import ClearIcon from '@material-ui/icons/Clear';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const Message = props => {
    let deleteHandler = (props.message.errorState ? props.toggleDeleteMessage : props.handleDeleteMessage);
    return (
        <div
            style={props.style}
            className={(props.message.sender_id === getCurrentUser().id || props.message.errorState) ? "self-message" : "partner-message"}>
          <div className={"message" + (props.message.errorState ? " error-state" : "")}>
              <div className="sender">{props.message.senders_name}</div>
              {props.message.content}
              <div className="sended">{props.message.send_time}</div>
              {props.message.sender_id === getCurrentUser().id ?
                  <div className='delete-but' onClick={() => deleteHandler(props.message)}><ClearIcon/></div> : null}
              {props.message.errorState ?
                  <div className='error-flag' onClick={() => props.handleDeleteMessage(props.message.id)}><AutorenewIcon/></div> : null}
          </div>
        </div>
    );
};

export default Message

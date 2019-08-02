import React from "react"
import Message from "./Message";
import { hot } from 'react-hot-loader/root';
import {sendMessage} from "../../services/messagesServices";
import {getCurrentUser} from "../../services/sessionStorageServices";
import SendIcon from '@material-ui/icons/Send';

const MessageList = props => {
    let messages = props.messages.map((message) => {
      return (<Message handleDeleteMessage={props.handleDeleteMessage} key={message.id} message={message} />);
    });
    let newMessage = '';
    return (
        <div className="talk">
          <div className="message-box">
            <div id="m-list" className="messages">
              {messages}
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              let newMessageContent = newMessage.value;
              if (newMessageContent) {
                  e.target.reset();
                  sendMessage({
                      message: {
                          content: newMessageContent,
                          sender_id: getCurrentUser().id,
                          recipient_id: props.roomId,
                          recipient_type: "Room",
                          sender_type: "User",
                      }
                  })
              }

            }} className="send-box messages">
                <div>
                    <input ref={input => newMessage = input} type="text"/>
                    <button><SendIcon/></button>
                </div>
            </form>
          </div>
        </div>
    );
};

export default hot(MessageList)

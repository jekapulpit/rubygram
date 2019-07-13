import React from "react"
import Message from "./Message";
import { hot } from 'react-hot-loader/root';
import {sendMessage} from "../../services/messagesServices";
import {getCurrentUser} from "../../services/sessionStorageServices";

const MessageList = props => {
    let messages = props.messages.map((message) => {
      return (<Message key={message.id} message={message} />);
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
              e.target.reset();
              sendMessage({
                message: {
                  content: newMessageContent,
                  sender_id: getCurrentUser().id,
                  recipient_id: props.roomId,
                  recipient_type: "Room",
                  sender_type: "User",
                }
              }).then(() => {

              });
            }} className="send-box">
              <input ref={input => newMessage = input} type="text"/>
              <input type="submit" value="send" />
            </form>
          </div>
        </div>
    );
};

export default hot(MessageList)

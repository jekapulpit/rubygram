import React from "react"
import Message from "./Message";
import { hot } from 'react-hot-loader/root';

const MessageList = props => {
    let messages = props.messages.map((message) => {
      return (<Message key={message.id} message={message} />);
    });
    return (
        <div className="talk">
          <div className="message-box">
            <div id="m-list" className="messages">
              {messages}
            </div>
            <div className="send-box">
            </div>
          </div>
        </div>
    );
};

export default hot(MessageList)

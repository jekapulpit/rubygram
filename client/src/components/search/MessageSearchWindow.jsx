import React from "react"
import '../../stylesheets/components/search.scss'
import Message from "../messages/Message";
import {searchMessages} from "../../services/searchService";

const MessageSearchWindow = props => {
    let messageContent={};
    let results = props.results.map((result) => {
        return <Message message={result}/>
    });
    return (
        <div className="talk">
            <div className="message-box">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let newMessageContent = messageContent.value;
                    searchMessages(newMessageContent, '/' + props.roomId)
                        .then((data) => {
                            props.toggleExecuteMessageSearch(data.results)
                        })
                }} className="send-box">
                    <input ref={input => messageContent = input} type="text"/>
                    <input type="submit" value="search" />
                </form>
                <div id="m-list" className="messages">
                    {results}
                </div>
            </div>
        </div>
    );
};

export default MessageSearchWindow
import React from "react"
import '../../stylesheets/components/search.scss'
import Message from "../messages/Message";
import {searchMessages} from "../../services/searchService";
import SearchIcon from '@material-ui/icons/Search';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const MessageSearchWindow = props => {
    let messageContent={};
    let roomId = !!props.roomId ? ('/' + props.roomId) : '';
    let results = props.results.map((result) => {
        return <Message key={result.id} message={result}/>
    });
    return (
        <div className="talk">
            <div className="message-box">
                <form onSubmit={(e) => e.preventDefault() } className="send-box">
                    <div className="back-controls">
                        <button className="btn back" onClick={() => {props.toggleCleanMessageResults()}}><ArrowRightAltIcon className='arrow'/>back</button>
                    </div>
                    <div className="inputs">
                        <input
                            ref={input => messageContent = input}
                            placeholder={!!props.roomId ? `search in room ${props.room.name}` : 'search in all rooms'}
                            onChange={(e) => {
                                e.preventDefault();
                                let newMessageContent = messageContent.value;
                                searchMessages(newMessageContent, roomId)
                                    .then((data) => {
                                        props.toggleExecuteMessageSearch(data.results)
                                    })
                            }}
                            type="text"/>
                        <div className='icon'>
                            <SearchIcon />
                        </div>
                    </div>
                </form>
                <div id="m-list" className="messages">
                    {results}
                </div>
            </div>
        </div>
    );
};

export default MessageSearchWindow

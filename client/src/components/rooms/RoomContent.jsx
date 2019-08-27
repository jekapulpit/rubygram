import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import '../../stylesheets/components/buttons.scss'
import RoomList from "./RoomList";
import {search} from "../../actionTypes";
import {connect} from "react-redux";
import MessageSearchWindow from "../search/MessageSearchWindow";
import {deleteMessage} from "../../services/messagesServices";

const RoomContent = props => {
    let fill = props.search.messageSearch ? (
        <React.Fragment>
            <MessageSearchWindow toggleCleanMessageResults={props.toggleCleanMessageResults}
                                 toggleExecuteMessageSearch={props.toggleExecuteMessageSearch}
                                 toggleMessageSearch={props.toggleMessageSearch}
                                 handleDeleteMessage={(message) => {
                                     deleteMessage(message.id)
                                         .then((result) => {
                                             if(result.success)
                                                 props.toggleDeleteMessageResult(result.message)
                                         })
                                 }}
                                 results={props.search.messageResults}/>
        </React.Fragment>

    ) : (
        <React.Fragment>
            <div className="room-header">
                <button className="btn neutral" onClick={() => {props.toggleMessageSearch()}}>search for messages</button>
            </div>
            <RoomList />
        </React.Fragment>
    );
    return (
        <div className='content-container'>
            {fill}
        </div>
    )
};
const mapStateToProps = state => ({
    search: state.search
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleMessageSearch: (data) => {
            dispatch({ type: search.TOGGLE_MESSAGES, data: data })
        },
        toggleExecuteMessageSearch: (results) => {
            dispatch({ type: search.EXECUTE_MESSAGES, results: results })
        },
        toggleCleanMessageResults: () => {
            dispatch({ type: search.CLEAN_MESSAGES })
        },
        toggleDeleteMessageResult: (message) => {
            dispatch({ type: search.DELETE_MESSAGE, message: message })
        },
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomContent));
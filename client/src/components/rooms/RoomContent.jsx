import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import RoomList from "./RoomList";
import {search} from "../../actionTypes";
import {connect} from "react-redux";
import MessageSearchWindow from "../search/MessageSearchWindow";

const RoomContent = props => {
    let fill = props.search.messageSearch ? (
        <React.Fragment>
            <div className="room-header">
                <button onClick={() => {props.toggleCleanMessageResults()}}>back</button>
            </div>
            <MessageSearchWindow toggleExecuteMessageSearch={props.toggleExecuteMessageSearch}
                                 toggleMessageSearch={props.toggleMessageSearch}
                                 results={props.search.messageResults}/>
        </React.Fragment>

    ) : (
        <React.Fragment>
            <div className="room-header">
                <button onClick={() => {props.toggleMessageSearch()}}>search messages</button>
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
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomContent));
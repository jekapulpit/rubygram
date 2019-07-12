import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {messages, rooms} from "../../actionTypes";
import {connect} from "react-redux";

const ActiveRoom = props => {
    return (
        <div className='content-container'>

        </div>
    )
};

const mapStateToProps = state => ({
    room: state.rooms.currentRoom
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSendMessage: (message) => {
            dispatch({ type: messages.SEND, message: message })
        },
        toggleReceiveMessage: (message) => {
            dispatch({ type: messages.RECEIVE, message: message })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(ActiveRoom));
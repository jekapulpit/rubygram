import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {messages, rooms} from "../../actionTypes";
import {connect} from "react-redux";
import Cable from './Cable'
import {getRoom} from "../../services/roomsServices";
import MessageList from "../messages/MessageList";
import basicScroll from '../../services/scrollingService'

class ActiveRoom extends React.Component {
    componentDidMount() {
        getRoom(this.props.match.params.id)
            .then((data) => {
                this.props.toggleSetRoom(data)
            })
            .then(() => basicScroll())
    }

    render() {
        return (
            <div className='content-container'>
                <Cable room={this.props.room.roomInfo}/>
                <MessageList roomId={this.props.room.roomInfo.id} messages={this.props.room.messages}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    room: state.rooms.currentRoom
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetRoom: (data) => {
            dispatch({ type: rooms.SET_CURRENT_ROOM, data: data })
        },
        toggleSendMessage: (message) => {
            dispatch({ type: messages.SEND, message: message })
        },
        toggleReceiveMessage: (message) => {
            dispatch({ type: messages.RECEIVE, message: message })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(ActiveRoom));
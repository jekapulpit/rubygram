import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {receiveMessage} from "../../services/messagesServices";
import {messages, rooms, search} from "../../actionTypes";
import {connect} from "react-redux";

class RoomCable extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !(!!this.props.room.id && nextProps.room.id === this.props.room.id);
    }

    render() {
        return (
            <ActionCableConsumer
                key={this.props.room.id}
                channel={{ channel: 'RoomsChannel', room_id: this.props.room.id }}
                onDisconnected={() => { this.props.toggleDisconnect() }}
                onConnected={() => { this.props.toggleConnect() }}
                onReceived={receiveMessage}
            />
        )
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleConnect: () => {
            dispatch({ type: rooms.CONNECT})
        },
        toggleDisconnect: () => {
            dispatch({ type: rooms.DISCONNECT})
        },
    }
};

export default hot(connect(null, mapDispatchToProps)(RoomCable));

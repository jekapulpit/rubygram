import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {receiveMessage} from "../../services/messagesServices";
import {rooms} from "../../actionTypes";
import {connect} from "react-redux";
import {getRoom} from "../../services/roomsServices";

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
                onConnected={() => {
                    this.props.toggleConnect();
                    if(!this.props.connected)
                        getRoom(this.props.room.id)
                        .then((data) => this.props.toggleSetRoom(data))}
                }
                onReceived={receiveMessage}
            />
        )
    }
}

const mapStateToProps = state => ({
    connected: state.rooms.currentRoom.connected,
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetRoom: (data) => {
            dispatch({ type: rooms.SET_CURRENT_ROOM, data: data })
        },
        toggleConnect: () => {
            dispatch({ type: rooms.CONNECT})
        },
        toggleDisconnect: () => {
            dispatch({ type: rooms.DISCONNECT})
        },
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomCable));

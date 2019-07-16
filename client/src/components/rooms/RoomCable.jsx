import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {receiveMessage} from "../../services/messagesServices";

class RoomCable extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !(!!this.props.room.id && nextProps.room.id === this.props.room.id);
    }

    render() {
        return (
            <ActionCableConsumer
                key={this.props.room.id}
                channel={{ channel: 'RoomsChannel', room_id: this.props.room.id }}
                onReceived={receiveMessage}
            />
        )
    }
}

export default hot(RoomCable);
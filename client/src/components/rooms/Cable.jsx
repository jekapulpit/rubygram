import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {receiveMessage} from "../../services/messagesServices";

const Cable = props => {
    return (
        <ActionCableConsumer
            key={props.room.id}
            channel={{ channel: 'RoomsChannel', room_id: props.room.id }}
            onReceived={receiveMessage}
        />
    )
};

export default hot(Cable);
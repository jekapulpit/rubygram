import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import Room from "./Room";

const RoomList = props => {
    let rooms = props.rooms.map((room) => {
        return (
            <Room
                handleChangeSettings={props.handleChangeSettings}
                room={room}
                key={room.id} />
        )
    });
    return (
        <div className='invite-list'>
            {rooms}
        </div>
    )
};

export default hot(RoomList);
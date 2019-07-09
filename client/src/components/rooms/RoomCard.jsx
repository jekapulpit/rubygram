import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'

const RoomCard = props => {
    return (
        <div className='room-card'>
            {props.room.name}
        </div>
    )
};

export default hot(RoomCard);
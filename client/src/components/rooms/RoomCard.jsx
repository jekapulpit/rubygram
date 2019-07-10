import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'

const RoomCard = props => {
    return (
        <div className='room-card'>
            <h2>{props.room.name}</h2>
            <p>0 new messages</p>
        </div>
    )
};

export default hot(RoomCard);
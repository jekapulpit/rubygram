import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import RoomList from "./RoomList";

const RoomContent = props => {
    return (
        <div className='content-container'>
            roomList:
            <RoomList />
        </div>
    )
};

export default hot(RoomContent);
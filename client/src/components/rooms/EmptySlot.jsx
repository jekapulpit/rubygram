import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'

const EmptySlot = props => {
    return (
        <div className='room-card'>

        </div>
    )
};

export default hot(EmptySlot);
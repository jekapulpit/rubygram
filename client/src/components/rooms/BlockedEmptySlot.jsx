import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'

const BlockedEmptySlot = props => {
        return (
            <div className='room-card'>
                empty
            </div>
        )
};

export default hot(BlockedEmptySlot);
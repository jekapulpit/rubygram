import React from 'react';
import { hot } from 'react-hot-loader/root';
import LockIcon from '@material-ui/icons/Lock';
import '../../stylesheets/components/rooms.scss'

const BlockedEmptySlot = props => {
        return (
            <div className='room-card'>
                <LockIcon style={{
                    color: '#C0448A',
                    fontSize: '40px'
                }} />
            </div>
        )
};

export default hot(BlockedEmptySlot);
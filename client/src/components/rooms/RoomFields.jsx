import React from 'react';
import { hot } from 'react-hot-loader/root';
import DoneIcon from '@material-ui/icons/Done';

const RoomFields = props => {
    let newRoomsName = {};
    return (
        <div className="edit-card">
            <div className="edit-fields">
                <input ref={input => newRoomsName = input} defaultValue={!!props.defaultName ? props.defaultName : ''} type="text"/>
                <DoneIcon style={{cursor: 'pointer'}} onClick={() => props.submitHandler(newRoomsName.value)} />
            </div>
            <button className='btn reject' onClick={() => props.cancelHandler()}>cancel</button>
        </div>
    )
};

export default hot(RoomFields);

import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {rooms} from "../../actionTypes";
import {deleteRoom} from "../../services/roomsServices";
import {connect} from "react-redux";

const RoomCard = props => {
    return (
        <div className='room-card with-room'>
            <div className='room-card info'>
                <h2>{props.room.name}</h2>
            </div>
            <div className="control-pop-up">
                <button onClick={() => {
                    deleteRoom(props.room.id)
                        .then((data) => {
                            props.toggleDeleteRoom(data.destroyed.id)
                        })
                }}>x</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleDeleteRoom: (roomId) => {
            dispatch({ type: rooms.DELETE, roomId: roomId })
        }
    }
};

export default hot(connect(null, mapDispatchToProps)(RoomCard));
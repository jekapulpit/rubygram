import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'
import {getUserRooms} from "../../services/roomsServices";
import {rooms} from "../../actionTypes";
import {maxChats} from '../../constants'
import EmptySlot from "./EmptySlot";
import BlockedEmptySlot from "./BlockedEmptySlot";

class RoomList extends React.Component {
    componentDidMount() {
        getUserRooms().then((data) => {
            this.props.toggleSetRooms(data.rooms)
        });
    }

    render() {
        let rooms = this.props.roomList.map((room) => {
            return (
                <React.Fragment>
                    <RoomCard key={room.id} room={room} />
                </React.Fragment>
            )
        });

        let restSlotsNumber = (maxChats - rooms.length - 1);

        let emptySlots = (new Array(restSlotsNumber >= 0 ? restSlotsNumber : 0).fill(null)).map((slot) => {
            return (<BlockedEmptySlot />)
        });

        return (
            <div className='room-list'>
                {rooms}
                {rooms.length >= 5 ? null : <EmptySlot />}
                {emptySlots}
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetRooms: (newRoomList) => {
            dispatch({ type: rooms.SET_ROOM_LIST, newRoomList: newRoomList })
        }
    }
};

const mapStateToProps = state => ({
    roomList: state.rooms.roomList
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomList));
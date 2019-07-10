import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'
import {getUserRooms} from "../../services/roomsServices";
import {rooms} from "../../actionTypes";
import {maxChats} from '../../constants'
import EmptySlot from "./EmptySlot";

class RoomList extends React.Component {
    componentDidMount() {
        getUserRooms().then((data) => {
            this.props.toggleSetRooms(data.rooms)
        });
    }

    randomInteger = (min, max) => {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    };

    render() {
        let rooms = this.props.roomList.map((room) => {
            return (<RoomCard key={room.id} room={room} />)
        });

        let emptySlots = (new Array(maxChats - rooms.length).fill(null)).map((slot) => {
            return (<EmptySlot key={this.randomInteger(-100, -50)} />)
        });

        return (
            <div className='room-list'>
                {rooms}
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
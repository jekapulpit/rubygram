import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'
import {getUserRooms} from "../../services/roomsServices";
import {rooms} from "../../actionTypes";

class RoomList extends React.Component {
    componentDidMount() {
        getUserRooms.then((data) => {
            this.props.toggleSetRooms(data.rooms)
        });
    }

    render() {
        let rooms = this.props.roomList.map((room) => {
            return (<RoomCard key={room.id} room={room} />)
        });
        return (
            <div className='room-list'>
                {rooms}
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
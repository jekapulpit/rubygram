import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'
import {getUserRooms} from "../../services/roomsServices";
import {rooms} from "../../actionTypes";
import EmptySlot from "./EmptySlot";
import BlockedEmptySlot from "./BlockedEmptySlot";

class RoomList extends React.Component {
    componentDidMount() {
        getUserRooms().then((data) => {
            this.props.toggleSetRooms(data.rooms)
        });
    }

    render() {
        let createdRooms = this.props.roomList.filter((room) => room.member_status === "creator")
            .map((room) => {
            return (<RoomCard key={room.id} room={room} />)
        });

        let memberships = this.props.roomList.filter((room) => room.member_status === "member")
            .map((room) => {
            return (<RoomCard key={room.id} user={this.props.currentUser} room={room} />)
        });

        let restSlotsNumber = this.props.currentUser.admin ? 0 : (this.props.currentUser.max_chats - createdRooms.length - 1);

        let emptySlots = (new Array(restSlotsNumber >= 0 ? restSlotsNumber : 0).fill(null)).map((slot) => {
            return (<BlockedEmptySlot />)
        });

        return (
            <div className='room-list'>
                <p>your chats: </p>
                <div className="room-section">
                    {createdRooms}
                    {(this.props.currentUser.admin || (this.props.currentUser.max_chats - createdRooms.length > 0)) ? (<EmptySlot />) : null}
                    {emptySlots}
                </div>
                <p>your memberships: </p>
                <div className="room-section">
                    {memberships}
                </div>
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
    roomList: state.rooms.roomList,
    currentUser: state.users.currentUser
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomList));
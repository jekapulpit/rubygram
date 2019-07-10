import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'
import {getUserRooms} from "../../services/roomsServices";
import {getTokenFromSessionStorage} from "../../services/sessionStorageServices";

class RoomList extends React.Component {
    componentDidMount() {
        getUserRooms.then((data) => {
            console.log(data.rooms)
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
    return {}
};

const mapStateToProps = state => ({
    roomList: state.rooms.roomList
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomList));
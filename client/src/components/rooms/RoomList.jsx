import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'

const roomsStub = [{ id:1, name: 'alooo' }, { id:2, name: 'sssss' }];

const RoomList = props => {
    let rooms = roomsStub.map((room) => {
        return (<RoomCard room={room} />)
    });
    return (
        <div className='room-list'>
            {rooms}
        </div>
    )
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {}
};

const mapStateToProps = state => ({
    roomList: state.rooms.roomList
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomList));
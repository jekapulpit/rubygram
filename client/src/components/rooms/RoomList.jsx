import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import RoomCard from "./RoomCard";
import '../../stylesheets/components/rooms.scss'

const roomsStub = [{
        id:1,
        name: 'alooo',
        users: [
            {
                id: 1,
                username: "zheka",
                email: "q010@bk.ru"
            },
            {
                id: 3,
                username: "zheka1",
                email: "q020@bk.ru"
            },
        ]
    },
    {
        id:2,
        name: 'sssss',
        users: [
            {
                id: 1,
                username: "zheka",
                email: "q010@bk.ru"
            },
            {
                id: 3,
                username: "zheka1",
                email: "q020@bk.ru"
            },
        ]
    }];

const RoomList = props => {
    let rooms = roomsStub.map((room) => {
        return (<RoomCard key={room.id} room={room} />)
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
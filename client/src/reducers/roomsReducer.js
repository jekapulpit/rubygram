import {rooms} from "../actionTypes";

export default (state = { roomList: [], currentRoom: {} }, action) => {
    switch (action.type) {
        case rooms.SET_ROOM_LIST:
            let newRoomList = action.newRoomList;
            return {...state, roomList: newRoomList};
        default:
            return state;
    }
};

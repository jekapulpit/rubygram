import {rooms} from "../actionTypes";

export default (state = { roomList: [], currentRoom: {} }, action) => {
    switch (action.type) {
        case rooms.SET_ROOM_LIST:
            let RoomList = action.newRoomList;
            return {...state, roomList: RoomList};
        case rooms.CREATE:
            let newRoomList = state.roomList.concat(action.newRoom);
            return {...state, roomList: newRoomList};
        default:
            return state;
    }
};

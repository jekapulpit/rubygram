import {rooms} from "../actionTypes";

export default (state = { roomList: [], currentRoom: {} }, action) => {
    switch (action.type) {
        case rooms.SET_ROOM_LIST:
            let RoomList = action.newRoomList;
            return {...state, roomList: RoomList};
        case rooms.CREATE:
            let newRoomList = state.roomList.concat(action.newRoom);
            return {...state, roomList: newRoomList};
        case rooms.DELETE:
            let newRooms = state.roomList.filter((room) => room.id !== action.roomId);
            return {...state, roomList: newRooms};
        case rooms.UPDATE:
            let updatedRooms = state.roomList.map((room) => {
               if(room.id === action.room.id)
                   return action.room;
               return room
            });
            return {...state, roomList: updatedRooms};
        default:
            return state;
    }
};

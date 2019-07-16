import {messages, rooms} from "../actionTypes";

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
        case rooms.SET_CURRENT_ROOM:
            let {room, users} = action.data;
            return {...state, currentRoom: { messages: action.data.messages, roomInfo: room, users: users }};
        case rooms.SHOW_USERS:
            return {...state, showUsers: !state.showUsers };
        case rooms.ADD_USER:
            let newUserList = state.currentRoom.users.concat(action.user);
            return {...state, currentRoom: { ...state.currentRoom, users: newUserList} };
        case rooms.DELETE_USER:
            let newUsers = state.currentRoom.users.filter((user) => user.id !== action.userId);
            return {...state, currentRoom: { ...state.currentRoom, users: newUsers} };


        case messages.GET_ALL_MESSAGES:
            return {...state, currentRoom: {...state.currentRoom, messages: action.messages}};
        case messages.RECEIVE:
            let messageList = [...state.currentRoom.messages, action.message];
            return {...state, currentRoom: {...state.currentRoom, messages: messageList}};
        case messages.SEND:
            let newMessageList = [...state.currentRoom.messages, action.message];
            return {...state, currentRoom: {...state.currentRoom, messages: newMessageList}};
        default:
            return state;
    }
};

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
            return {...state, currentRoom: { messages: action.data.messages, roomInfo: room, users: users, connected: true }};
        case rooms.UNSUBSCRIBE:
            let newMembers = state.currentRoom.users.filter((user) => user.id !== action.user_id);
            return {...state, currentRoom: { ...state.currentRoom, users: newMembers }};
        case rooms.ANSWER:
            let newMemberList = state.currentRoom.users.concat(action.user);
            return {...state, currentRoom: { ...state.currentRoom, users: newMemberList }};
        case rooms.SHOW_USERS:
            return {...state, showUsers: !state.showUsers };
        case rooms.ADD_USER:
            let newUserList = state.currentRoom.users.concat(action.user);
            return {...state, currentRoom: { ...state.currentRoom, users: newUserList} };
        case rooms.UPDATE_SLOTS:
            return {...state, currentRoom: {...state.currentRoom, roomInfo:
                            {...state.currentRoom.roomInfo,
                                empty_slots: state.currentRoom.roomInfo.empty_slots += action.param
                            }
                    }
            };
        case rooms.DELETE_USER:
            let newUsers = state.currentRoom.users.filter((user) => user.id !== action.userId);
            return {...state, currentRoom: { ...state.currentRoom, users: newUsers} };
        case rooms.CONNECT:
            return {...state, currentRoom: { ...state.currentRoom, connected: true} };
        case rooms.DISCONNECT:
            return {...state, currentRoom: { ...state.currentRoom, connected: false} };

        case messages.GET_ALL_MESSAGES:
            return {...state, currentRoom: {...state.currentRoom, messages: action.messages}};
        case messages.RECEIVE:
            let messageList = [...state.currentRoom.messages, action.message];
            return {...state, currentRoom: {...state.currentRoom, messages: messageList}};
        case messages.DELETE:
            let newMessages = state.currentRoom.messages.filter((message) => message.id !== action.message.id);
            return {...state, currentRoom: {...state.currentRoom, messages: newMessages}};
        case messages.SEND:
            let newMessage = action.message;
            if (action.errorState) {
                newMessage.errorState = action.errorState;
                newMessage.id = state.currentRoom.messages[state.currentRoom.messages.length - 1].id > 0 ?
                    (-state.currentRoom.messages[state.currentRoom.messages.length - 1].id - 1) :
                    (state.currentRoom.messages[state.currentRoom.messages.length - 1].id - 1);
            }
            let newMessageList = [...state.currentRoom.messages, newMessage];
            return {...state, currentRoom: {...state.currentRoom, messages: newMessageList}};
        default:
            return state;
    }
};

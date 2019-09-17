import { messages, rooms } from '../actionTypes';

export default (state = { roomList: [], currentRoom: {} }, action) => {
  switch (action.type) {
    case rooms.SET_ROOM_LIST:
      const RoomList = action.newRoomList;
      return { ...state, roomList: RoomList };
    case rooms.CREATE:
      const newRoomList = state.roomList.concat(action.newRoom);
      return { ...state, roomList: newRoomList };
    case rooms.DELETE:
      const newRooms = state.roomList.filter((room) => room.id !== action.roomId);
      return { ...state, roomList: newRooms };
    case rooms.UPDATE:
      const updatedRooms = state.roomList.map((room) => {
        if (room.id === action.room.id) return action.room;
        return room;
      });
      return { ...state, roomList: updatedRooms };
    case rooms.SET_CURRENT_ROOM:
      const { room, users } = action.data;
      return {
        ...state,
        currentRoom: {
          messages: action.data.messages, roomInfo: room, users, connected: true,
        },
      };
    case rooms.UNSUBSCRIBE:
      const newMembers = state.currentRoom.users.filter((user) => user.id !== action.user_id);
      return { ...state, currentRoom: { ...state.currentRoom, users: newMembers } };
    case rooms.ANSWER:
      const newMemberList = state.currentRoom.users.concat(action.user);
      return { ...state, currentRoom: { ...state.currentRoom, users: newMemberList } };
    case rooms.SHOW_USERS:
      return { ...state, showUsers: !state.showUsers };
    case rooms.ADD_USER:
      const newUserList = state.currentRoom.users.concat(action.user);
      return { ...state, currentRoom: { ...state.currentRoom, users: newUserList } };
    case rooms.UPDATE_SLOTS:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          roomInfo:
                            {
                              ...state.currentRoom.roomInfo,
                              empty_slots: state.currentRoom.roomInfo.empty_slots += action.param,
                            },
        },
      };
    case rooms.DELETE_USER:
      const newUsers = state.currentRoom.users.filter((user) => user.id !== action.userId);
      return { ...state, currentRoom: { ...state.currentRoom, users: newUsers } };
    case rooms.CONNECT:
      return { ...state, currentRoom: { ...state.currentRoom, connected: true } };
    case rooms.DISCONNECT:
      return { ...state, currentRoom: { ...state.currentRoom, connected: false } };

    case messages.GET_ALL_MESSAGES:
      return { ...state, currentRoom: { ...state.currentRoom, messages: action.messages } };
    case messages.RECEIVE:
      const messageList = [...state.currentRoom.messages, action.message];
      return { ...state, currentRoom: { ...state.currentRoom, messages: messageList } };
    case messages.DELETE:
      const newMessages = state.currentRoom.messages.filter((message) => message.id !== action.message.id);
      return { ...state, currentRoom: { ...state.currentRoom, messages: newMessages } };
    case messages.SEND:
      const newMessage = action.message;
      if (action.errorState) {
        newMessage.errorState = action.errorState;
        newMessage.id = state.currentRoom.messages[state.currentRoom.messages.length - 1].id > 0
          ? (-state.currentRoom.messages[state.currentRoom.messages.length - 1].id - 1)
          : (state.currentRoom.messages[state.currentRoom.messages.length - 1].id - 1);
      }
      const newMessageList = [...state.currentRoom.messages, newMessage];
      return { ...state, currentRoom: { ...state.currentRoom, messages: newMessageList } };
    default:
      return state;
  }
};

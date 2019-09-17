export default {
  users: {
    currentUser: {
      ignoring_users: [],
    },
    loggedIn: false,
  },
  rooms: {
    showUsers: false,
    roomList: [],
    currentRoom: {
      roomInfo: {},
      messages: [],
      users: [],
      connected: true,
    },
  },
  search: {
    active: false,
    messageSearch: false,
    results: [],
    messageResults: [],
    roomsResults: [],
  },
  invites: {
    inviteList: [],
  },
};

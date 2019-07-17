export default  {
    users: {
        currentUser: {},
        loggedIn: false
    },
    rooms: {
        showUsers: false,
        roomList: [],
        currentRoom: {
            roomInfo: {},
            messages: [],
            users: []
        }
    },
    search: {
        active: false,
        messageSearch: false,
        results: [],
        messageResults: [],
    },
    invites: {
        inviteList: []
    }
};

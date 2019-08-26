export default  {
    users: {
        currentUser: {
            ignoring_users: []
        },
        loggedIn: false
    },
    rooms: {
        showUsers: false,
        roomList: [],
        currentRoom: {
            roomInfo: {},
            messages: [],
            users: [],
            connected: false
        }
    },
    search: {
        active: false,
        messageSearch: false,
        results: [],
        messageResults: [],
        roomsResults: [],
    },
    invites: {
        inviteList: []
    }
};

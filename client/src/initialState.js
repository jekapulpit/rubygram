import { getTokenFromCookie } from "./services/cookieServices";

export default  {
    users: {
        currentUser: {},
        loggedIn: false
    },
    rooms: {
        roomList: [],
        currentRoom: {}
    }
};

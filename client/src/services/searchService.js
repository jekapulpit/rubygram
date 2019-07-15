import {API_HOST, API_PORT} from "../constants";
import {getTokenFromSessionStorage} from "./sessionStorageServices";

export default (request, room) => fetch(`http://${API_HOST}:${API_PORT}/api/v4/users/search/?request=${request}&room_id=${room}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
    .then((response) => { return response.json() });

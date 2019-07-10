import { apiHost, apiPort } from '../constants'
import { getTokenFromSessionStorage } from "./sessionStorageServices";

export const getUserRooms = fetch('http://localhost:3001/api/v4/rooms/', {
                                            mode: 'cors',
                                            headers: {
                                                'Authorization': getTokenFromSessionStorage()
                                            }
                                        })
                                            .then((response) => { return response.json() });


export async function getRoom(roomId) {
    return fetch(`http://localhost:3001/api/v4/rooms/${roomId}`, {
        mode: 'cors',
        headers: {
            'Authorization': getTokenFromSessionStorage()
        }
    })
        .then((response) => { return response.json() });
}

export const addNewRoom = (roomAttributes) => {

};

export const deleteRoom = (roomId) => {

};

export const updateRoom = (roomAttributes) => {

};

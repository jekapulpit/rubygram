import usersReducer from "./reducers/usersReducer";
import { createStore, combineReducers } from "redux"; // импорт из Redux-библиотеки
import initialState from './initialState';
import roomsReducer from "./reducers/roomsReducer";

export default createStore(
    combineReducers({
        users: usersReducer,
        rooms: roomsReducer
    }),
    initialState);

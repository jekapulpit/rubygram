import usersReducer from "./reducers/usersReducer";
import { createStore, combineReducers } from "redux"; // импорт из Redux-библиотеки
import initialState from './initialState';
import roomsReducer from "./reducers/roomsReducer";
import searchReducer from "./reducers/searchReducer";

export default createStore(
    combineReducers({
        users: usersReducer,
        rooms: roomsReducer,
        search: searchReducer,
    }),
    initialState);

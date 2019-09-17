import { search } from '../actionTypes';

export default (state = { results: [], active: false }, action) => {
  switch (action.type) {
    case search.TOGGLE:
      return { ...state, active: !state.active };
    case search.EXECUTE:
      return { ...state, results: action.results };
    case search.SEND:
      const newResults = state.results.map((result) => {
        if (result.id === action.userId) return { ...result, invite_status: 'sent' };
        return result;
      });
      return { ...state, results: newResults };
    case search.CANCEL:
      const newInviteResults = state.results.map((result) => {
        if (result.id === action.userId) return { ...result, invite_status: null };
        return result;
      });
      return { ...state, results: newInviteResults };
    case search.CLEAN:
      return { ...state, results: [] };
    case search.TOGGLE_MESSAGES:
      return { ...state, messageSearch: true };
    case search.EXECUTE_MESSAGES:
      return { ...state, messageResults: action.results };
    case search.CLEAN_MESSAGES:
      return { ...state, messageResults: [], messageSearch: false };
    case search.DELETE_MESSAGE:
      const newMessages = state.messageResults.filter((message) => message.id != action.message.id);
      return { ...state, messageResults: newMessages };
    case search.UPDATE_USER_RESULTS:
      const results = state.results.map((result) => {
        if (result.id == action.result.id) return action.result;
        return result;
      });
      return { ...state, results };
    case search.UPDATE_ROOM_RESULTS:
      const roomResults = state.roomsResults.map((result) => {
        if (result.id == action.result.id) return action.result;
        return result;
      });
      return { ...state, roomsResults: roomResults };
    case search.EXECUTE_ROOMS:
      return { ...state, roomsResults: action.results };
    case search.CLEAN_ROOMS:
      return { ...state, roomsResults: [] };
    default:
      return state;
  }
};

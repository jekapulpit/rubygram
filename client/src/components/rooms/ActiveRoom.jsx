import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {messages, rooms, search} from "../../actionTypes";
import {connect} from "react-redux";
import {getRoom, readAllMessages, unsubscribeUser} from "../../services/roomsServices";
import MessageList from "../messages/MessageList";
import UserSearchWindow from "../search/UserSearchWindow";
import { searchUsers } from '../../services/searchService'
import RoomCable from "./RoomCable";
import UserList from "./UserList";
import MessageSearchWindow from "../search/MessageSearchWindow";
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AddIcon from '@material-ui/icons/Add';
import {syncCurrentUser} from "../../services/authentificationService";
import {deleteMessage} from "../../services/messagesServices";
import {getCurrentUser} from "../../services/sessionStorageServices";


class ActiveRoom extends React.Component {
    componentDidMount() {
        getRoom(this.props.match.params.id)
            .then((data) => {
                this.props.toggleSetRoom(data)
            })
            .then(() => this.props.toggleCleanResults())
            .then(() => readAllMessages(this.props.match.params.id))
            .then(() => syncCurrentUser())
    }

    handleSearch = (request) => {
        searchUsers(request, this.props.room.roomInfo.id)
            .then((data) => {
                this.props.toggleExecuteSearch(data.results)
            })
    };

    handleUnsubscribe = (roomId, userId) => {
        unsubscribeUser(roomId, userId)
            .then((result) => {
                if(result) this.props.toggleDeleteUser(userId);
            })
    };

    handleDeleteMessage = (message) => {
        deleteMessage(message.id);
    };

    render() {
        let fill = this.props.search.messageSearch ? (
            <React.Fragment>
                <MessageSearchWindow toggleExecuteMessageSearch={this.props.toggleExecuteMessageSearch}
                                     toggleCleanMessageResults={this.props.toggleCleanMessageResults}
                                     toggleMessageSearch={this.props.toggleMessageSearch}
                                     handleDeleteMessage={this.handleDeleteMessage}
                                     room={this.props.room.roomInfo}
                                     roomId={this.props.room.roomInfo.id}
                                     results={this.props.search.messageResults}/>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <div className="room-header active-room">
                    <div className="members">
                        <p className="clickable-link" onClick={() => this.props.toggleShowUsers()}><AccessibilityIcon /> {this.props.room.users.length} member(s)</p>
                        {this.props.room.roomInfo.creator === getCurrentUser().id ?
                            <p className="clickable-link" onClick={() => this.props.toggleSearch()}><AddIcon /> invite more people</p> : null
                        }
                    </div>
                    <button className="btn neutral"
                            onClick={() => {this.props.toggleMessageSearch()}}>search for messages in room</button>
                </div>
                <RoomCable
                    room={this.props.room.roomInfo}/>
                <MessageList handleDeleteMessage={this.handleDeleteMessage}
                             toggleDeleteMessage={this.props.toggleDeleteMessage}
                             toggleSendMessage={this.props.toggleSendMessage}
                             roomId={this.props.room.roomInfo.id}
                             connected={this.props.room.connected}
                             messages={this.props.room.messages}/>
                <UserSearchWindow handleSearch={this.handleSearch}
                                  toggleIncrementSlots={this.props.toggleIncrementSlots}
                                  toggleDecrementSlots={this.props.toggleDecrementSlots}
                                  toggleCancelInvite={this.props.toggleCancelInvite}
                                  toggleSendInvite={this.props.toggleSendInvite}
                                  results={this.props.search.results}
                                  toggleSearch={this.props.toggleSearch}
                                  room={this.props.room.roomInfo}
                                  visible={this.props.search.active}/>
                <UserList visible={this.props.showUsers}
                          room={this.props.room.roomInfo}
                          handleUnsubscribe={this.handleUnsubscribe}
                          toggleShowUsers={this.props.toggleShowUsers}
                          users={this.props.room.users}/>
            </React.Fragment>
        );

        return (
            <div className='content-container'>
                {fill}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    room: state.rooms.currentRoom,
    showUsers: state.rooms.showUsers,
    search: state.search
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetRoom: (data) => {
            dispatch({ type: rooms.SET_CURRENT_ROOM, data: data })
        },
        toggleShowUsers: () => {
            dispatch({ type: rooms.SHOW_USERS })
        },
        toggleAddUser: (user) => {
            dispatch({ type: rooms.ADD_USER, user: user })
        },
        toggleIncrementSlots: () => {
            dispatch({ type: rooms.UPDATE_SLOTS, param: 1 })
        },
        toggleDecrementSlots: () => {
            dispatch({ type: rooms.UPDATE_SLOTS, param: -1 })
        },
        toggleDeleteUser: (userId) => {
            dispatch({ type: rooms.DELETE_USER, userId: userId })
        },
        toggleDeleteMessage: (message) => {
            dispatch({ type: messages.DELETE, message: message })
        },
        toggleSendMessage: (message, errorState = false) => {
            dispatch({ type: messages.SEND, message: message, errorState: errorState })
        },
        toggleReceiveMessage: (message) => {
            dispatch({ type: messages.RECEIVE, message: message })
        },
        toggleSearch: () => {
            dispatch({ type: search.TOGGLE })
        },
        toggleSendInvite: (userId) => {
            dispatch({ type: search.SEND, userId: userId })
        },
        toggleCancelInvite: (userId) => {
            dispatch({ type: search.CANCEL, userId: userId })
        },
        toggleCleanResults: () => {
            dispatch({ type: search.CLEAN })
        },
        toggleExecuteSearch: (results) => {
            dispatch({ type: search.EXECUTE, results: results })
        },
        toggleMessageSearch: (data) => {
            dispatch({ type: search.TOGGLE_MESSAGES, data: data })
        },
        toggleExecuteMessageSearch: (results) => {
            dispatch({ type: search.EXECUTE_MESSAGES, results: results })
        },
        toggleCleanMessageResults: () => {
            dispatch({ type: search.CLEAN_MESSAGES })
        },
        toggleDeleteMessageResult: (message) => {
            dispatch({ type: search.DELETE_MESSAGE, message: message })
        },
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(ActiveRoom));
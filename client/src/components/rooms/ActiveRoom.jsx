import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {messages, rooms, search} from "../../actionTypes";
import {connect} from "react-redux";
import {getRoom} from "../../services/roomsServices";
import MessageList from "../messages/MessageList";
import basicScroll from '../../services/scrollingService'
import SearchWindow from "../search/SearchWindow";
import searchUsers from '../../services/searchService'
import RoomCable from "./RoomCable";
import UserList from "./UserList";

class ActiveRoom extends React.Component {
    componentDidMount() {
        getRoom(this.props.match.params.id)
            .then((data) => {
                this.props.toggleSetRoom(data)
            })
            .then(() => this.props.toggleCleanResults())
            .then(() => basicScroll())
    }

    handleSearch = (request) => {
        searchUsers(request, this.props.room.roomInfo.id)
            .then((data) => {
                this.props.toggleExecuteSearch(data.results)
            })
    };

    render() {
        return (
            <div className='content-container'>
                <div className="room-header">
                    <button onClick={() => this.props.toggleSearch()}>invite more people</button>
                    <p onClick={() => this.props.toggleShowUsers()}>show users ({this.props.room.users.length})</p>
                </div>
                <RoomCable room={this.props.room.roomInfo}/>
                <MessageList roomId={this.props.room.roomInfo.id} messages={this.props.room.messages}/>
                <SearchWindow  handleSearch={this.handleSearch}
                               toggleSendInvite={this.props.toggleSendInvite}
                               results={this.props.search.results}
                               toggleSearch={this.props.toggleSearch}
                               room={this.props.room.roomInfo}
                               visible={this.props.search.active}/>
                <UserList visible={this.props.showUsers}
                          toggleShowUsers={this.props.toggleShowUsers}
                          users={this.props.room.users}/>
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
        toggleSendMessage: (message) => {
            dispatch({ type: messages.SEND, message: message })
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
        toggleCleanResults: () => {
            dispatch({ type: search.CLEAN })
        },
        toggleExecuteSearch: (results) => {
            dispatch({ type: search.EXECUTE, results: results })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(ActiveRoom));
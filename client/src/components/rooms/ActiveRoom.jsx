import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {messages, rooms} from "../../actionTypes";
import {connect} from "react-redux";
import Cable from './Cable'
import {getRoom} from "../../services/roomsServices";

class ActiveRoom extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        getRoom(this.props.match.params.id)
            .then((data) => {
                this.props.toggleSetRoom(data)
            })
    }

    render() {
        return (
            <div className='content-container'>
                {this.props.room.roomInfo.id ? (<Cable room={this.props.room.roomInfo}/>) : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    room: state.rooms.currentRoom
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleSetRoom: (data) => {
            dispatch({ type: rooms.SET_CURRENT_ROOM, data: data })
        },
        toggleSendMessage: (message) => {
            dispatch({ type: messages.SEND, message: message })
        },
        toggleReceiveMessage: (message) => {
            dispatch({ type: messages.RECEIVE, message: message })
        }
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(ActiveRoom));
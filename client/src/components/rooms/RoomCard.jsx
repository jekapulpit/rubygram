import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {rooms} from "../../actionTypes";
import {deleteRoom, unsubscribeUser, updateRoom} from "../../services/roomsServices";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import RoomFields from "./RoomFields";

class RoomCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
    }

    handleEdit = () => {
        this.setState({
            editable: !this.state.editable
        })
    };

    handleUnsubscribe = (roomId, userId) => {
        unsubscribeUser(roomId, userId)
            .then((result) => {
                if(result) this.props.toggleDeleteRoom(roomId);
            })
    };

    handleUpdate = (newRoomAttributes) => {
        let roomAttributes = {
            room: {
                name: newRoomAttributes
            }
        };
        updateRoom(this.props.room.id, roomAttributes)
            .then((data) => {
                this.props.toggleUpdateRoom(data.room)
            })
            .then(() => {
                this.setState({
                    editable: false
                })
            })
    };

    render() {
        let controls = this.props.room.member_status === "creator" ? (
            <React.Fragment>
                <ClearIcon onClick={() => {
                    deleteRoom(this.props.room.id)
                        .then((data) => {
                            this.props.toggleDeleteRoom(data.destroyed.id)
                        })
                }}/>
                <EditIcon onClick={() => this.handleEdit()} />
            </React.Fragment>
        ) : (
            <div onClick={() => this.handleUnsubscribe(this.props.room.id, this.props.user.id)}
                 style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
                <ClearIcon/>
                leave this chat
            </div>
        );
            let fill = this.state.editable ? (
                <RoomFields defaultName={this.props.room.name} submitHandler={this.handleUpdate} cancelHandler={this.handleEdit}/>
            ) : (
            <React.Fragment>
                <Link to={'/home/rooms/' + this.props.room.id} className='room-card info'>
                    <h2>{this.props.room.name}</h2>
                </Link>
                <div className="control-pop-up">
                    {controls}
                </div>
            </React.Fragment>
        );

        return (
            <div className='room-card with-room'>
                {fill}
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleDeleteRoom: (roomId) => {
            dispatch({ type: rooms.DELETE, roomId: roomId })
        },
        toggleUpdateRoom: (room) => {
            dispatch({ type: rooms.UPDATE, room: room })
        }
    }
};

export default hot(connect(null, mapDispatchToProps)(RoomCard));
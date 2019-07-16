import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {rooms} from "../../actionTypes";
import {deleteRoom, unsubscribeUser, updateRoom} from "../../services/roomsServices";
import {connect} from "react-redux";
import {Grid} from "@material-ui/core";
import { Link } from 'react-router-dom';

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
                <button onClick={() => {
                    deleteRoom(this.props.room.id)
                        .then((data) => {
                            this.props.toggleDeleteRoom(data.destroyed.id)
                        })
                }}>x</button>
                <button onClick={() => this.handleEdit()}>edit</button>
            </React.Fragment>
        ) : (
            <button onClick={() => this.handleUnsubscribe(this.props.room.id, this.props.user.id)}>leave</button>
        );
            let fill = this.state.editable ? (
            <Grid container
                  direction="row"
                  spacing={2} >
                <Grid item xs={12}>
                    <input ref={input => this.newRoomsName = input} defaultValue={this.props.room.name} type="text"/>
                </Grid>
                <Grid item xs={6}>
                    <button onClick={() => this.handleUpdate(this.newRoomsName.value)}>update</button>
                </Grid>
                <Grid item xs={6}>
                    <button onClick={() => this.handleEdit()}>cancel</button>
                </Grid>
            </Grid>
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
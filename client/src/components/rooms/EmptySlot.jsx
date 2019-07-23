import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {rooms} from "../../actionTypes";
import {connect} from "react-redux";
import {addNewRoom} from "../../services/roomsServices";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import RoomFields from "./RoomFields";

class EmptySlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
    }

    handleNew = () => {
        this.setState({
            editable: !this.state.editable
        })
    };

    handleCreate = (newRoomAttributes) => {
        let roomAttributes = {
            room: {
                name: newRoomAttributes
            }
        };
        addNewRoom(roomAttributes)
            .then((data) => {
                this.props.toggleCreateRoom(data.room)
            })
            .then(() => {
                this.setState({
                    editable: false
                })
            })
    };

    render() {
        let fill = this.state.editable ? (
            <RoomFields submitHandler={this.handleCreate} cancelHandler={this.handleNew}/>
        ) : (
            <LockOpenIcon onClick={() => this.handleNew()} style={{
                color: '#C0448A',
                fontSize: '40px',
                cursor: 'pointer',
            }}/>
        );
        return (
            <div className='room-card'>
                {fill}
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleCreateRoom: (newRoom) => {
            dispatch({ type: rooms.CREATE, newRoom: newRoom })
        }
    }
};

export default hot(connect(null, mapDispatchToProps)(EmptySlot));

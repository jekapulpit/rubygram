import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {mapFieldsToValues} from "../../services/mapFieldsToValuesService";
import {rooms} from "../../actionTypes";
import {connect} from "react-redux";
import {addNewRoom} from "../../services/roomsServices";

class EmptySlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
    }

    handleNew = () => {
        this.setState({
            editable: true
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
            <div>
                <input ref={input => this.newRoomsName = input} type="text"/>
                <button onClick={() => this.handleCreate(this.newRoomsName.value)}>create</button>
            </div>
        ) : (
            <button onClick={() => this.handleNew()}>+</button>
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
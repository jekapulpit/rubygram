import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {rooms} from "../../actionTypes";
import {connect} from "react-redux";
import {addNewRoom} from "../../services/roomsServices";
import {Grid} from "@material-ui/core";

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
            <Grid container
                  direction="row"
                  spacing={2} >
                <Grid item xs={12}>
                    <input ref={input => this.newRoomsName = input} type="text"/>
                </Grid>
                <Grid item xs={6}>
                    <button onClick={() => this.handleCreate(this.newRoomsName.value)}>create</button>
                </Grid>
                <Grid item xs={6}>
                    <button onClick={() => this.handleNew()}>cancel</button>
                </Grid>
            </Grid>
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

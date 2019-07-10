import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import {mapFieldsToValues} from "../../services/mapFieldsToValuesService";

class EmptySlot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
        this.newRoomAttributes = {}
    }

    handleNew = () => {
        this.setState({
            editable: true
        })
    };

    handleCreate = (newRoomAttributes) => {

    };

    render() {
        let fill = this.state.editable ? (
            <div>
                <input ref={input => this.newRoomAttributes.name = input} type="text"/>
                <button onClick={() => this.handleCreate(mapFieldsToValues(this.newRoomAttributes))}>create</button>
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

export default hot(EmptySlot);
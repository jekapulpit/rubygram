import React from 'react';
import { hot } from 'react-hot-loader/root';
import { search } from "../../actionTypes";
import { connect } from "react-redux";
import {searchRooms} from '../../services/searchService'
import {changeDefaultRoomSettings, changeRoomSettings} from "../../services/roomsServices";
import {API_HOST, API_PORT} from "../../constants";
import {getTokenFromSessionStorage} from "../../services/sessionStorageServices";
import SearchIcon from '@material-ui/icons/Search';
import RoomList from "./RoomList";

class RoomsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: 0
        }
    }

    componentDidMount() {
        fetch(`http://${API_HOST}:${API_PORT}/api/v4/settings/rooms/default`, {
            mode: 'cors',
            headers: {
                'Authorization': getTokenFromSessionStorage()
            }
        })
            .then((response) => { return response.json() })
            .then((result) => {
                this.setState({
                    defaultValue: result.setting.value
                })
            })
    }

    handleChangeSettings = (roomId, newValue) => {
        changeRoomSettings(roomId, newValue)
            .then((result) => {
                this.props.toggleUpdateResults(result.room)
            })
    };

    handleChangeDefaultSettings = (newValue) => {
        changeDefaultRoomSettings(newValue)
            .then(() => {
                this.setState({
                    defaultValue: newValue
                })
            })
    };

    handleSearch = (request) => {
        searchRooms(request)
            .then((data) => {
                this.props.toggleExecuteSearch(data.results)
            })
    };

    render() {
        let roomData={};
        return (
            <div className='content-container'>
                <div className="room-header search">
                    <div className="defaults">
                        default users number: {this.state.defaultValue}
                        <div className="controls">
                            <button className='btn accept' onClick={() => this.handleChangeDefaultSettings(this.state.defaultValue + 1)}>+</button>
                            <button className='btn reject' onClick={() => this.handleChangeDefaultSettings(this.state.defaultValue - 1)}>-</button>
                        </div>
                    </div>
                    <form className="settings-form" onSubmit={(e) => {
                        e.preventDefault();
                    }} data-remote="true">
                        <div className="inputs">
                            <input placeholder='start typing...' onChange={() => this.handleSearch(roomData.data.value)} ref={input => roomData.data = input} />
                            <div className='icon'>
                                <SearchIcon />
                            </div>
                        </div>
                    </form>
                </div>
                <RoomList rooms={this.props.search.roomsResults}
                          handleChangeSettings={this.handleChangeSettings} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    search: state.search,
    currentUser: state.users.currentUser
});

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleCleanResults: () => {
            dispatch({ type: search.CLEAN_ROOMS })
        },
        toggleExecuteSearch: (results) => {
            dispatch({ type: search.EXECUTE_ROOMS, results: results })
        },
        toggleUpdateResults: (result) => {
            dispatch({ type: search.UPDATE_ROOM_RESULTS, result: result })
        },
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(RoomsSettings));
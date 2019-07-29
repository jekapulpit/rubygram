import React from 'react';
import { hot } from 'react-hot-loader/root';
import { search } from "../../actionTypes";
import { connect } from "react-redux";
import {searchUsersGlobal} from '../../services/searchService'
import UserList from "./UserList";
import {changeDefaultUserSettings, changeUserSettings, givePriveleges} from "../../services/usersServices";
import {API_HOST, API_PORT} from "../../constants";
import {getTokenFromSessionStorage} from "../../services/sessionStorageServices";
import SearchIcon from '@material-ui/icons/Search';

class UsersSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultValue: 0
        }
    }

    componentDidMount() {
        fetch(`http://${API_HOST}:${API_PORT}/api/v4/settings/users/default`, {
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

    handleChangeSettings = (userId, newValue) => {
        changeUserSettings(userId, newValue)
            .then((result) => {
                this.props.toggleUpdateResults(result.user)
            })
    };

    handleChangeDefaultSettings = (newValue) => {
        changeDefaultUserSettings(newValue)
            .then(() => {
                this.setState({
                    defaultValue: newValue
                })
            })
    };

    handleSearch = (request) => {
        searchUsersGlobal(request)
            .then((data) => {
                this.props.toggleExecuteSearch(data.results)
            })
    };

    handleGivePrivileges = (userId) => {
        givePriveleges(userId)
            .then((result) => {
                this.props.toggleUpdateResults(result.user)
            })
    };

    render() {
        let userData={};
        return (
            <div className='content-container'>
                <div className="room-header search">
                    <div className="defaults">
                        default max rooms number: {this.state.defaultValue}
                        <div className="controls">
                            <button className='btn accept' onClick={() => this.handleChangeDefaultSettings(this.state.defaultValue + 1)}>+</button>
                            <button className='btn reject' onClick={() => this.handleChangeDefaultSettings(this.state.defaultValue - 1)}>-</button>
                        </div>
                    </div>
                    <form className="settings-form" onSubmit={(e) => {
                        e.preventDefault();
                    }} data-remote="true">
                        <div className="inputs">
                            <input placeholder='start typing...' onChange={() => this.handleSearch(userData.data.value)} ref={input => userData.data = input} />
                            <div className='icon'>
                                <SearchIcon />
                            </div>
                        </div>
                    </form>
                </div>
                <UserList users={this.props.search.results}
                          handleGivePrivileges={this.handleGivePrivileges}
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
        toggleSendInvite: (userId) => {
            dispatch({ type: search.SEND, userId: userId })
        },
        toggleCleanResults: () => {
            dispatch({ type: search.CLEAN })
        },
        toggleExecuteSearch: (results) => {
            dispatch({ type: search.EXECUTE, results: results })
        },
        toggleUpdateResults: (result) => {
            dispatch({ type: search.UPDATE_USER_RESULTS, result: result })
        },
    }
};

export default hot(connect(mapStateToProps, mapDispatchToProps)(UsersSettings));
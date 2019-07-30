import React from "react"
import { hot } from 'react-hot-loader/root';
import {connect} from "react-redux";
import {users} from "../../actionTypes";
import {getCurrentUser, updateUserSession} from "../../services/sessionStorageServices";
import {changeUserSettings, ignoreUser, stopIgnoreUser, updateUser} from "../../services/usersServices";
import {getUser} from "../../services/usersServices";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import '../../stylesheets/components/profile.scss'
import IgnoredUser from "./IgnoredUser";
import {syncCurrentUser} from "../../services/authentificationService";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            currentUser: {
                ignoring_users: [],
            },
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(nextProps.match.params.id === this.state.currentUser.id)
    }

    componentDidMount() {
        getUser(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    currentUser: data.user
                })
            })
    }

    ignored = () => {
        return this.props.currentUser.ignoring_users
            .map((user) => {return user.id})
            .indexOf(this.state.currentUser.id) === -1;
    };

    componentWillReceiveProps(nextProps, nextContext) {
        getUser(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    currentUser: data.user
                })
            })
    }

    selfProfile = () => {
        return (this.state.currentUser.id === this.props.currentUser.id)
    };

    handleEdit = (userData = false) => {
        if(this.state.editable && userData) {
            updateUser(getCurrentUser().id, {
                user: {
                    username: userData.username.value
                }
            })
                .then((data) => {
                    this.props.toggleUpdate(data.user);
                    updateUserSession(data.user)
                })
        }
        this.setState({
            editable: !this.state.editable
        })
    };

    handleDeleteFromBlackList = (userId) => {
        stopIgnoreUser(userId)
            .then((data) => {
                if(data.success){
                    let newBlackList = this.state.currentUser.ignoring_users.filter((user) => user.id !== data.user.id)
                    this.setState({
                        currentUser: {
                            ...this.state.currentUser,
                            ignoring_users: newBlackList
                        }
                    })
                }
            })

    };

    handleStopIgnore = (userId) => {
        stopIgnoreUser(userId)
            .then((data) => {
                if (data.success)
                    syncCurrentUser();
            });
    };

    handleAddToBlackList = (userId) => {
        ignoreUser(userId)
            .then((data) => {
                if (data.success)
                    syncCurrentUser();
            })
    };

    handleChangeSettings = (newValue) => {
        changeUserSettings(this.state.currentUser.id, newValue)
            .then((result) => {
                if(result.success)
                    this.setState({
                        currentUser: result.user
                    })
            })
    };

    render() {
        let userData = {};
        let field = (this.state.editable && this.selfProfile()) ? (
            <input ref={input => userData.username = input} defaultValue={this.state.currentUser.username} type="text"/>
        ) : (
            this.state.currentUser.username
        );
        let blackList = this.selfProfile() ? (
            this.state.currentUser.ignoring_users.map((user) => {
                return <IgnoredUser handleDeleteFromBlackList={this.handleDeleteFromBlackList} user={user}/>
            })
        ) : (
            null
        );
        return (
            <div className='content-container'>
                <div className="user-data">
                    <div className="username">
                        {field}
                        {this.selfProfile() ? (this.state.editable ? (
                            <React.Fragment>
                                <DoneIcon onClick={() => this.handleEdit(userData)}/>
                                <ClearIcon onClick={() => this.handleEdit()}/>
                            </React.Fragment>
                            ) : <EditIcon onClick={() => this.handleEdit(userData)}/>) : null}
                    </div>
                    <p>email: {this.state.currentUser.email}</p>
                    <p>
                        rooms available: {this.state.currentUser.admin ? 'infinite' : this.state.currentUser.max_chats }
                        {(this.props.currentUser.admin && !this.selfProfile() && !this.state.currentUser.admin) ? (
                            <div className='controls'>
                                <button className='btn accept' onClick={() => this.handleChangeSettings(this.state.currentUser.max_chats + 1)}>+</button>
                                <button className='btn reject' onClick={() => this.handleChangeSettings(this.state.currentUser.max_chats - 1)}>-</button>
                            </div>) : null}
                    </p>
                    {this.selfProfile() ? '' :
                        (this.ignored() ?
                            (<button onClick={() => this.handleAddToBlackList(this.state.currentUser.id)} className="btn reject">ignore</button>) :
                            (<button onClick={() => this.handleStopIgnore(this.state.currentUser.id)} className="btn empty">stop ignore</button>))}
                </div>
                <div className='invite-list'>
                    {this.selfProfile() ? 'Black List: ' : ''}
                        {blackList}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {
        toggleUpdate: (newAttributes) => {
            dispatch({ type: users.UPDATE, newAttributes: newAttributes })
        }
    }
};

const mapStateToProps = state => ({
    currentUser: state.users.currentUser
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Profile));

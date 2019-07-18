import React from "react"
import { hot } from 'react-hot-loader/root';
import {connect} from "react-redux";
import {users} from "../../actionTypes";
import {getCurrentUser, updateUserSession} from "../../services/sessionStorageServices";
import {updateUser} from "../../services/usersServices";
import {getUser} from "../../services/usersServices";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            currentUser: {}
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

    componentWillReceiveProps(nextProps, nextContext) {
        getUser(this.props.match.params.id)
            .then((data) => {
                this.setState({
                    currentUser: data.user
                })
            })
    }

    isSelfProfile = () => {
        return (this.state.currentUser.id === this.props.currentUser.id)
    };

    handleEdit = (userData) => {
        if(this.state.editable) {
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

    render() {
        let userData = {};
        let field = (this.state.editable && this.isSelfProfile()) ? (
            <h1><input ref={input => userData.username = input} defaultValue={this.state.currentUser.username} type="text"/></h1>
        ) : (
            <h1>{this.state.currentUser.username}</h1>
        );
        return (
            <div className='content-container'>
                <div className="user-data">
                    {field}
                    {this.isSelfProfile() ? <button onClick={() => this.handleEdit(userData)}>{this.state.editable ? 'save' : 'edit username'}</button> : null}
                    <p>email: {this.state.currentUser.email}</p>
                    <p>rooms available: {this.state.currentUser.admin ? 'infinite' : this.state.currentUser.max_chats }</p>
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

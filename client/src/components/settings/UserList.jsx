import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import User from "./User";

const UserList = props => {
    let users = props.users.map((user) => {
        return (
            <User
                handleGivePrivileges={props.handleGivePrivileges}
                handleChangeSettings={props.handleChangeSettings}
                user={user}
                key={user.id} />
        )
    });
    return (
        <div className='invite-list'>
            {users}
        </div>
    )
};

export default hot(UserList);
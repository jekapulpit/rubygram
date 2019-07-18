import React from "react"
import '../../stylesheets/components/search.scss'
import User from "./User";

const UserList = props => {
    let users = props.users.map((user) => {
        return (<User key={user.id} room={props.room} handleUnsubscribe={props.handleUnsubscribe} userInfo={user}/>)
    });
    return (
        <div className={"pop-up-background" + (props.visible ? "" : " hidden")}>
            <div className="pop-up">
                <div style={{ height: '560px' }} className="results">
                    {users}
                </div>
                <div className="exit">
                    <button onClick={() => {props.toggleShowUsers()}}>x</button>
                </div>
            </div>
        </div>
    );
};

export default UserList

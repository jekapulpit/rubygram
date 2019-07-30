import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/notifications.scss'
import {Link} from "react-router-dom";

const IgnoredUser = props => {
    return (
        <div className="invite">
            <Link to={'/home/profile/' + props.user.id}>
                {props.user.username}
            </Link>
            <div className="invite-controls">
                <button className="btn empty" onClick={() => props.handleDeleteFromBlackList(props.user.id)}>stop ignoring</button>
            </div>
        </div>
    )
};

export default hot(IgnoredUser);
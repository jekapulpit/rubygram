import React from 'react';
import { hot } from 'react-hot-loader/root';
import '../../stylesheets/components/rooms.scss'
import { ActionCableConsumer } from 'react-actioncable-provider';
import {receiveInvite} from "../../services/invitesServices";

class NotificationsCable extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }

    render() {
        return (
            <ActionCableConsumer
                channel={{ channel: 'NotificationsChannel' }}
                onReceived={receiveInvite}
            />
        )
    }
}

export default hot(NotificationsCable);
import React from "react"
import Message from "./Message";
import { hot } from 'react-hot-loader/root';
import {sendMessage} from "../../services/messagesServices";
import {getCurrentUser} from "../../services/sessionStorageServices";
import SendIcon from '@material-ui/icons/Send';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.cache = new CellMeasurerCache({
            fixedWidth: false,
            defaultHeight: 100
        });
    }

    handleSendMessage = message => {
        let newMessageAttrs = {
                content: message,
                sender_id: getCurrentUser().id,
                recipient_id: this.props.roomId,
                recipient_type: "Room",
                sender_type: "User",
            };
        if (this.props.connected)
            sendMessage({message: newMessageAttrs});
        else
            this.props.toggleSendMessage(newMessageAttrs, true);
    };

    renderRow = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <Message
                    style={style}
                    toggleDeleteMessage={this.props.toggleDeleteMessage}
                    handleDeleteMessage={this.props.handleDeleteMessage}
                    message={this.props.messages[index]}/>
            </CellMeasurer>
        );
    };
    render() {
        this.newMessage = '';
        let alert = this.props.connected ? (
            null
        ) : (
            <div className="error-alert">
                you are disconnected
            </div>
        );

        return (
            <div className="talk">
                <div className="message-box">
                    <div id="m-list" className="messages">
                        {alert}
                        <AutoSizer>
                            {
                                ({ width, height }) => {
                                    return <List
                                        ref='List'
                                        width={width}
                                        height={height}
                                        deferredMeasurementCache={this.cache}
                                        rowHeight={this.cache.rowHeight}
                                        scrollToIndex={this.props.messages.length}
                                        rowRenderer={this.renderRow}
                                        rowCount={this.props.messages.length}
                                        overscanRowCount={3} />
                                }
                            }
                        </AutoSizer>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        let newMessageContent = this.newMessage.value;
                        if (newMessageContent) {
                            e.target.reset();
                            this.handleSendMessage(newMessageContent);
                        }
                    }} className="send-box messages">
                        <div>
                            <input ref={input => this.newMessage = input} type="text"/>
                            <button><SendIcon/></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default hot(MessageList)

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

    renderRow = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                cache={this.cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}>
                <Message style={style} handleDeleteMessage={this.props.handleDeleteMessage} message={this.props.messages[index]}/>
            </CellMeasurer>
        );
    };
    render() {
        this.newMessage = '';

        return (
            <div className="talk">
                <div className="message-box">
                    <div id="m-list" className="messages">
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
                            sendMessage({
                                message: {
                                    content: newMessageContent,
                                    sender_id: getCurrentUser().id,
                                    recipient_id: this.props.roomId,
                                    recipient_type: "Room",
                                    sender_type: "User",
                                }
                            })
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

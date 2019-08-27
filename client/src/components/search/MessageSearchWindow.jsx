import React from "react"
import '../../stylesheets/components/search.scss'
import Message from "../messages/Message";
import {searchMessages} from "../../services/searchService";
import SearchIcon from '@material-ui/icons/Search';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

class MessageSearchWindow extends React.Component {
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
                <Message
                    style={style}
                    handleDeleteMessage={this.props.handleDeleteMessage}
                    message={this.props.results[index]}/>
            </CellMeasurer>
        );
    };

    render() {
        let messageContent = {};
        let roomId = !!this.props.roomId ? ('/' + this.props.roomId) : '';
        return (
            <div className="talk">
                <div className="message-box">
                    <form onSubmit={(e) => e.preventDefault()} className="send-box">
                        <div className="back-controls">
                            <button className="btn back" onClick={() => {
                                this.props.toggleCleanMessageResults()
                            }}><ArrowRightAltIcon className='arrow'/>back
                            </button>
                        </div>
                        <div className="inputs">
                            <input
                                ref={input => messageContent = input}
                                placeholder={!!this.props.roomId ? `search in room ${this.props.room.name}` : 'search in all rooms'}
                                onChange={(e) => {
                                    e.preventDefault();
                                    let newMessageContent = messageContent.value;
                                    searchMessages(newMessageContent, roomId)
                                        .then((data) => {
                                            this.props.toggleExecuteMessageSearch(data.results)
                                        })
                                }}
                                type="text"/>
                            <div className='icon'>
                                <SearchIcon/>
                            </div>
                        </div>
                    </form>
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
                                        rowRenderer={this.renderRow}
                                        rowCount={this.props.results.length}
                                        overscanRowCount={3} />
                                }
                            }
                        </AutoSizer>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageSearchWindow

import React from "react"
import UserResult from "./UserResult";
import '../../stylesheets/components/search.scss'

const UserSearchWindow = props => {
    let userData={};
    let emptySlots = (props.currentUser.admin ? 'infinite' : props.room.empty_slots);
    let results = props.results.map((result) => {
        return <UserResult
            toggleSendInvite={props.toggleSendInvite}
            toggleDecrementSlots={props.toggleDecrementSlots}
            toggleIncrementSlots={props.toggleIncrementSlots}
            toggleCancelInvite={props.toggleCancelInvite}
            room={props.room}
            key={result.id}
            userInfo={result}/>
    });
    return (
        <div className={"pop-up-background" + (props.visible ? "" : " hidden")}>
            <div className="pop-up">
                <div className="search-form">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.handleSearch(userData.data.value);
                    }} data-remote="true">
                        <input ref={input => userData.data = input} />
                        <button>search</button>
                    </form>
                </div>
                <h3 style={{textAlign: 'center'}}>You have {emptySlots} invite(s)</h3>
                <div className="results">
                    {results}
                </div>
                <div className="exit">
                    <button onClick={() => props.toggleSearch()}>x</button>
                </div>
            </div>
        </div>
    );
};

export default UserSearchWindow

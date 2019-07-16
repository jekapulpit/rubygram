import React from "react"
import Result from "./Result";
import '../../stylesheets/components/search.scss'

const SearchWindow = props => {
    let userData={};
    let results = props.results.map((result) => {
        return <Result toggleSendInvite={props.toggleSendInvite} room={props.room} key={result.id} userInfo={result}/>
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

export default SearchWindow

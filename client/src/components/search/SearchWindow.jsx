import React from "react"
import Result from "./Result";
import '../../stylesheets/components/search.scss'

const SearchWindow = props => {
    let userData={};
    let results = [];
    return (
        <div className={"pop-up-background" + (props.visible ? "" : " hidden")}>
            <div className="pop-up">
                <div className="search-form">
                    <form data-remote="true">
                        <input ref={input => userData.data = input} />
                    </form>
                </div>
                <div className="results">
                    {results}
                </div>
                <div className="exit">
                </div>
            </div>

        </div>
    );
};

export default SearchWindow

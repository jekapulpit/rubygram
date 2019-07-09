import React from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import '../stylesheets/components/menu.scss'

const Menu = props => {
    return (
        <div className="menu">
            <ul className="menu-puncts">
                <li className="menu-punct">
                    some punct
                </li>
                <li className="menu-punct">
                    some punct
                </li>
                <li className="menu-punct">
                    some punct
                </li>
            </ul>
        </div>
    )
};

const mapDispatchToProps = function(dispatch, ownProps) {
    return {}
};

const mapStateToProps = state => ({
    currentUser: state.users.currentUser
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(Menu));
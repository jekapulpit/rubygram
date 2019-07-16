import React from 'react';
import store from './store'
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';

function App() {
  return (
      <div>
          {JSON.stringify(store.getState())}
      </div>
  );
}

const mapDispatchToProps = function(dispatch, ownProps) {
    return {}
};

const mapStateToProps = state => ({
    currentUser: state.users.currentUser
});

export default hot(connect(mapStateToProps, mapDispatchToProps)(App));
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Login from './Login';

class LoginContainer extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    onLoginSubmit(loginCred) {
      console.log('loginCred', loginCred);
      this.props.Actions.signIn(loginCred.username, loginCred.password);
      Actions.dashboard();
    }

    render() {
        console.log('props', this.props);
        return (
            <Login
              onSubmit={this.onLoginSubmit.bind(this)}
              />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch) {
  return { Actions: bindActionCreators(ActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

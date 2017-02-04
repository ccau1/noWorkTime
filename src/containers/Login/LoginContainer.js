import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import Login from './Login';

class LoginContainer extends Component {
    static propTypes = {
    };

    constructor(props: any): void {
        super(props);
    }

    onLoginSubmit(loginCred: {username: string, password: string}): void {
      console.log('loginCred', loginCred);
      this.props.Actions.signIn(loginCred.username, loginCred.password);
      Actions.dashboard();
    }

    render() {
        return (
            <Login
              onSubmit={this.onLoginSubmit.bind(this)}
              />
        );
    }
}

function mapStateToProps(state: any): void {
    return {
        user: state.user,
    };
}

function mapDispatchToProps(dispatch: any): void {
  return { Actions: bindActionCreators(ActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

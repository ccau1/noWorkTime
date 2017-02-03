/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import Dashboard from './Dashboard';

class DashboardContainer extends Component {

  componentDidMount() {
    this.props.Actions.signIn();
    this.props.Actions.getWorkSettings();
  }

  render() {
    console.log('container', this.props.workSettings.toJS());
    return this.props.workSettings.toJS().item ? (
      <Dashboard workSettings={this.props.workSettings.toJS().item} user={this.props.user.toJS().item} />
    ) : null;
  }
}


function mapStateToProps(state) {
    return {
        user: state.user,
        workSettings: state.workSettings,
    };
}

function mapDispatchToProps(dispatch) {
  return { Actions: bindActionCreators(ActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

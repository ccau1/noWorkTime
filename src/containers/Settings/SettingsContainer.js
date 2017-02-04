/* @flow */

import React, { Component } from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

class SettingsContainer extends Component {

  onWorkSettingsChanged(newWorkSettings: any) {
    this.props.Actions.updateWorkSettings(newWorkSettings);
  }

  render() {
    return (
      <Settings workSettings={this.props.workSettings} onChange={this.onWorkSettingsChanged.bind(this)} />
    );
  }
}


function mapStateToProps(state: any): any {
    return {
        user: state.user,
        workSettings: state.workSettings,
    };
}

function mapDispatchToProps(dispatch: any): {Action: any} {
  return { Actions: bindActionCreators(ActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

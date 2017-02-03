/* @flow */

import React, { Component } from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

class SettingsContainer extends Component {

  onWorkSettingsChanged(newWorkSettings) {
    console.log('settings changed', newWorkSettings, this.props);
    this.props.Actions.updateWorkSettings(newWorkSettings);
  }

  render() {
    return (
      <Settings workSettings={this.props.workSettings} onChange={this.onWorkSettingsChanged.bind(this)} />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

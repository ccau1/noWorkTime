/* @flow */

import React, { Component } from 'react';
import Settings from './Settings';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import type { WorkSettingsModel } from '../../models';

class SettingsContainer extends Component {

  onWorkSettingsChanged(newWorkSettings: WorkSettingsModel) {
    this.props.Actions.updateWorkSettings(newWorkSettings);
  }

  render() {
    console.log('props', this.props);
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

function mapDispatchToProps(dispatch: any): {Actions: any} {
  return { Actions: bindActionCreators(ActionCreators, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);

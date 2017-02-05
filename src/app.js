import React, { Component } from 'React';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from './actions';
import {
  Router,
  Scene,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import LoginContainer from './containers/Login/LoginContainer';
import DashboardContainer from './containers/Dashboard/DashboardContainer';
import SettingsContainer from './containers/Settings/SettingsContainer';

const scenes = Actions.create(
    <Scene key="root">
      <Scene
        key="login"
        component={LoginContainer}
        title="Login"
        direction="vertical"
        hideNavBar
        type={ActionConst.RESET}
        />
        <Scene
          key="dashboard"
          component={DashboardContainer}
          title="Dashboard"
          hideNavBar
          initial
          />
        <Scene
          key="settings"
          component={SettingsContainer}
          title="Settings"
          direction="vertical"
          />
    </Scene>
);

class AppContainer extends Component {
  render() {
    return (
      <Router scenes={scenes} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {Actions: bindActionCreators(ActionCreators, dispatch)};
}

export default connect(() => { return {}; }, mapDispatchToProps)(AppContainer);

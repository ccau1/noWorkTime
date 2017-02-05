/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles.js';
import StatDisplay from '../../components/StatDisplay/StatDisplay';


export default class Dashboard extends Component {
  state: {
    statViews: {
      title: string;
      key: string;
    };
    currentStatView: number;
  };

  static propTypes = {
    workSettings: React.PropTypes.shape({
      dayStart: React.PropTypes.shape({
        hour: React.PropTypes.number,
        minute: React.PropTypes.number,
      }),
      dayEnd: React.PropTypes.shape({
        hour: React.PropTypes.number,
        minute: React.PropTypes.number,
      }).isRequired,
      daysOfWeek: React.PropTypes.arrayOf(React.PropTypes.number)
    }),
    user: React.PropTypes.object,
  };

  constructor(props: any): void {
    super(props);
    this.state = {
      statViews: [
        {
          title: 'Daily',
          key: 'daily-time',
        },
        {
          title: 'Daily',
          key: 'daily-percent',
        },
        {
          title: 'Weekly',
          key: 'weekly-time',
        },
        {
          title: 'Weekly',
          key: 'weekly-percent',
        },
      ],
      currentStatView: 0,
    };
  }

  toggleStatDisplay(): void {
    this.setState({
      currentStatView: this.state.currentStatView + 1 === this.state.statViews.length ? 0 : ++this.state.currentStatView
    });
  }

  openSettings(): void {
    Actions.settings();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.bgImage} source={require('../../images/background1.jpg')}>
          <View style={styles.statDisplayContainer}>
            <Text style={styles.title}>{this.state.statViews[this.state.currentStatView].title}</Text>
            <TouchableWithoutFeedback style={styles.statButton} onPress={this.toggleStatDisplay.bind(this)}>
              <View><StatDisplay workSettings={this.props.workSettings} view={this.state.statViews[this.state.currentStatView].key} /></View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={this.openSettings.bind(this)}>
              <Text style={styles.btnSettings}>Settings</Text>
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }
}

/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  Text,
} from 'react-native';
import styles from './styles.js';

export default class CountDownDisplay extends Component {

  static propTypes = {
    milliseconds: PropTypes.number,
  };

  getTimeDiffParts(ms: number): {days: number, hours: number, minutes: number, seconds: number} {
    let result = {};
    let secs = ms / 1000;
    let mins = secs / 60;
    let hours = mins / 60;
    let days = hours / 24;
    result.seconds = Math.floor(secs % 60);
    result.minutes = Math.floor(mins % 60);
    result.hours = Math.floor(hours % 24);
    result.days = Math.floor(days);

    return result;
  }

  render() {
    const timeDiffParts = this.getTimeDiffParts(this.props.milliseconds);

    return (
      <Text style={styles.text}>
        {timeDiffParts.days > 0 && <Text style={styles.dayStyle}>{timeDiffParts.days}:</Text>}
        {timeDiffParts.hours > 0 && <Text style={styles.hourStyle}>{timeDiffParts.hours}:</Text>}
        <Text style={styles.minuteStyle}>{timeDiffParts.minutes > 0 ? (timeDiffParts.minutes < 10 && '0') + timeDiffParts.minutes : '00'}:</Text>
        <Text style={styles.minuteStyle}>{timeDiffParts.seconds > 0 ? (timeDiffParts.seconds < 10 && '0') + timeDiffParts.seconds : '00'}</Text>
      </Text>
    );
  }
}

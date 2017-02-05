/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from './styles.js';
import CountDownDisplay from '../CountDownDisplay/CountDownDisplay';

export default class StatDisplay extends Component {
  timeUpdateInterval: number;

  static propTypes = {
    workSettings: React.PropTypes.shape({
      dayStart: React.PropTypes.shape({
        hour: React.PropTypes.number,
        minute: React.PropTypes.number,
      }),
      dayEnd: React.PropTypes.shape({
        hour: React.PropTypes.number,
        minute: React.PropTypes.number,
      }),
      daysOfWeek: React.PropTypes.arrayOf(React.PropTypes.number)
    }).isRequired,
    view: React.PropTypes.string,
  };

  componentWillMount(): void {
    this.timeUpdateInterval = setInterval(() => {
      this.forceUpdate();
    }, 900);
  }

  componentWillUnmount(): void {
    clearInterval(this.timeUpdateInterval);
  }

  getTodayStart(): number {
    const {hour, minute} = this.props.workSettings.dayStart;
    return (new Date()).setHours(hour, minute, 0, 0);
  }

  getTodayEnd(): number {
    const {hour, minute} = this.props.workSettings.dayEnd;
    return (new Date()).setHours(hour, minute, 0, 0);
  }

  isInDaysOfWeek(daysOfWeek: number[], day: number): boolean {
    return daysOfWeek.indexOf(day) > -1;
  }

  getCurrentDayOfWeek(): number {
    const curDayOfWeek = (new Date()).getDay() - 1;
    return curDayOfWeek === -1 ? 6 : curDayOfWeek;
  }

  getMillisecondsWeekWorked(): number {
    const curDayOfWeek = this.getCurrentDayOfWeek();
    const curTime = (new Date()).valueOf();
    const dayStart = this.getTodayStart();
    const dayEnd = this.getTodayEnd();
    const totalDaily = dayEnd - dayStart;
    let totalMs = 0;
    this.props.workSettings.daysOfWeek.forEach(dow => {
      if (dow < curDayOfWeek) {
        totalMs += totalDaily;
      } else if (dow === curDayOfWeek && curTime - dayStart > 0) {
        const timeWorkedToday = curTime - dayStart;
        totalMs += timeWorkedToday < totalDaily ? timeWorkedToday : totalDaily;
      }
    });
    return totalMs;
  }

  getStatDisplay() {
    const dayStart = this.getTodayStart();
    const dayEnd = this.getTodayEnd();
    const isWorkdayToday = this.isInDaysOfWeek(this.props.workSettings.daysOfWeek, this.getCurrentDayOfWeek());
    const totalDaily = dayEnd - dayStart;
    const totalWeekly = totalDaily * this.props.workSettings.daysOfWeek.length;
    const totalToday = isWorkdayToday ? totalDaily : 0;
    const dailyCompleted = isWorkdayToday ? (new Date()).valueOf() - dayStart : 0;
    const weeklyCompleted = this.getMillisecondsWeekWorked();
    const currentToEndOfDay = totalToday - dailyCompleted;
    const currentToEndOfWeek = totalWeekly - weeklyCompleted;
    let dailyCompletedPercent = parseFloat((dailyCompleted / totalDaily * 100).toFixed(2));
    if (dailyCompletedPercent > 100) {
      dailyCompletedPercent = 100;
    }
    let weeklyCompletedPercent = parseFloat((weeklyCompleted / totalWeekly * 100).toFixed(2));
    if (weeklyCompletedPercent > 100) {
      weeklyCompletedPercent = 100;
    }

    const progress = {
      size: 220,
      width: 10
    };

    switch (this.props.view) {
      case 'daily-time':
        return <AnimatedCircularProgress size={progress.size} width={progress.width} fill={parseFloat(dailyCompletedPercent)} tintColor="#00e0ff">
          {(fill) => (
            <View style={styles.progressContainer}><Text style={styles.statText}><CountDownDisplay milliseconds={currentToEndOfDay} /></Text></View>
          )}
        </AnimatedCircularProgress>;
      case 'daily-percent':
        return <AnimatedCircularProgress size={progress.size} width={progress.width} fill={parseFloat(dailyCompletedPercent)} tintColor="#00e0ff">
          {(fill) => (
            <View style={styles.progressContainer}><Text style={styles.statText}>{parseFloat(dailyCompletedPercent)}%</Text></View>
          )}
        </AnimatedCircularProgress>;
      case 'weekly-time':
        return <AnimatedCircularProgress size={progress.size} width={progress.width} fill={parseFloat(weeklyCompletedPercent)} tintColor="#00e0ff">
          {(fill) => (
            <View style={styles.progressContainer}><Text style={styles.statText}><CountDownDisplay milliseconds={currentToEndOfWeek} /></Text></View>
          )}
        </AnimatedCircularProgress>;
      case 'weekly-percent':
        return <AnimatedCircularProgress size={progress.size} width={progress.width} fill={parseFloat(weeklyCompletedPercent)} tintColor="#00e0ff">
          {(fill) => (
            <View style={styles.progressContainer}><Text style={styles.statText}>{parseFloat(weeklyCompletedPercent)}%</Text></View>
          )}
        </AnimatedCircularProgress>;
      default:
        return <Text>Keep Tappin'</Text>;
    }
  }

  render() {
    return (
      <View>
        {this.getStatDisplay()}
      </View>
    );
  }
}

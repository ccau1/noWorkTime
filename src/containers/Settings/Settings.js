/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import dismissKeyboard from 'dismissKeyboard';

export default class Settings extends Component {
  state: {
    workSettings: any
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
      }),
      daysOfWeek: React.PropTypes.arrayOf(React.PropTypes.number)
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      workSettings: props.workSettings.toJS(),
    };
  }

  componentWillReceiveProps(nextProps: any): void {
    if (!nextProps.workSettings.equals(this.props.workSettings)) {
      this.setState({
        workSettings: nextProps.workSettings.toJS()
      });
    }
  }

  closeSettings() {
    Actions.pop();
  }

  updateField(name: string, value: string|number) {
    const valParsedInt = parseInt(value, 10);
    let newWorkSettings = {...this.state.workSettings.item};
    switch (name) {
      case 'dayStart.hour':
        newWorkSettings.dayStart.hour = isNaN(valParsedInt) ? '' : valParsedInt;
        break;
      case 'dayStart.minute':
        newWorkSettings.dayStart.minute = isNaN(valParsedInt) ? '' : valParsedInt;
        break;
      case 'dayEnd.hour':
        newWorkSettings.dayEnd.hour = isNaN(valParsedInt) ? '' : valParsedInt;
        break;
      case 'dayEnd.minute':
        newWorkSettings.dayEnd.minute = isNaN(valParsedInt) ? '' : valParsedInt;
        break;
      case 'daysOfWeek':
        newWorkSettings.daysOfWeek = this.toggleDayOfWeek(newWorkSettings.daysOfWeek, parseInt(value));
        break;
    }

      console.log('newWorkSettings', newWorkSettings);

    this.setState({
      workSettings: {...this.state.workSettings, item: newWorkSettings}
    }, () => {
      if (this.validate(newWorkSettings).isValid) {
        console.log('isVALID', newWorkSettings);
        this.props.onChange(newWorkSettings);
      }
    });
  }

  validate(workSettings: any) {
    let result = {
      errors: [],
      isValid: true
    };

    if (workSettings.dayStart.hour === '' || isNaN(workSettings.dayStart.hour)) {
      result.errors.push({field: 'dayStart.hour', msg: 'number required'});
      result.isValid = false;
    }

    if (workSettings.dayStart.minute === '' || isNaN(workSettings.dayStart.minute)) {
      result.errors.push({field: 'dayStart.minute', msg: 'number required'});
      result.isValid = false;
    }

    if (workSettings.dayEnd.hour === '' || isNaN(workSettings.dayEnd.hour)) {
      result.errors.push({field: 'dayEnd.hour', msg: 'number required'});
      result.isValid = false;
    }

    if (workSettings.dayEnd.minute === '' || isNaN(workSettings.dayEnd.minute)) {
      result.errors.push({field: 'dayEnd.minute', msg: 'number required'});
      result.isValid = false;
    }

    return result;
  }

  toggleDayOfWeek(daysOfWeek: number[], day: number): number[] {
    const dayIndex = daysOfWeek.indexOf(day);
    if (dayIndex > -1) {
      daysOfWeek.splice(dayIndex, 1);
    } else {
      daysOfWeek.push(day);
    }
    return daysOfWeek;
  }

  isInDaysOfWeek(daysOfWeek: number[], day: number): boolean {
    return daysOfWeek.indexOf(day) > -1;
  }

  render() {
    const workSettings = this.state.workSettings.item;
    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <Image source={require('../../images/bg_settings.jpg')} style={styles.container}>
          <View style={styles.settingsFormContainer}>
            <Text style={styles.heading}>Settings</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, padding: 20}}>
                <Text style={styles.subHeading}>Start</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholder="HH"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="number-pad"
                    style={styles.inputNumber}
                    value={workSettings.dayStart.hour.toString()}
                    onChangeText={this.updateField.bind(this, 'dayStart.hour')}
                  />
                  <Text style={{padding: 10}}>:</Text>
                  <TextInput
                    placeholder="MM"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="number-pad"
                    style={styles.inputNumber}
                    value={workSettings.dayStart.minute.toString()}
                    onChangeText={this.updateField.bind(this, 'dayStart.minute')}
                  />
                </View>
              </View>
              <View style={{flex: 1, padding: 20}}>
                <Text style={styles.subHeading}>End</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholder="HH"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="number-pad"
                    style={styles.inputNumber}
                    value={workSettings.dayEnd.hour.toString()}
                    onChangeText={this.updateField.bind(this, 'dayEnd.hour')}
                  />
                  <Text style={{padding: 10}}>:</Text>
                  <TextInput
                    placeholder="MM"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    keyboardType="number-pad"
                    style={styles.inputNumber}
                    value={workSettings.dayEnd.minute.toString()}
                    onChangeText={this.updateField.bind(this, 'dayEnd.minute')}
                  />
                </View>
              </View>
            </View>
            <View style={{padding: 20}}>
              <Text style={styles.subHeading}>Days of Week</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 6)} style={workSettings.daysOfWeek.indexOf(6) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 6) ? styles.btnCircleActive : {}}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 0)} style={workSettings.daysOfWeek.indexOf(0) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 0) ? styles.btnCircleActive : {}}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 1)} style={workSettings.daysOfWeek.indexOf(1) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 1) ? styles.btnCircleActive : {}}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 2)} style={workSettings.daysOfWeek.indexOf(2) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 2) ? styles.btnCircleActive : {}}>W</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 3)} style={workSettings.daysOfWeek.indexOf(3) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 3) ? styles.btnCircleActive : {}}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 4)} style={workSettings.daysOfWeek.indexOf(4) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 4) ? styles.btnCircleActive : {}}>F</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.updateField.bind(this, 'daysOfWeek', 5)} style={workSettings.daysOfWeek.indexOf(5) > -1 ? styles.btnCircleContainerActive : styles.btnCircleContainer}>
                  <Text style={this.isInDaysOfWeek(workSettings.daysOfWeek, 5) ? styles.btnCircleActive : {}}>S</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={this.closeSettings.bind(this)}>
              <Text style={styles.btnClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: '#444',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  btnCircleContainer: {
    borderRadius: 40,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnCircleContainerActive: {
    backgroundColor: '#2980b9',
    borderRadius: 40,
    padding: 12,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnCircleActive: {
    color: '#FFF'
  },
  inputNumber: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    color: '#000',
    paddingHorizontal: 10,
    flex: 1,
    width: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    color: '#000',
    paddingHorizontal: 10,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    width: null,
    height: null,
  },
  settingsFormContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  btnClose: {
    padding: 50,
    color: '#000'
  }
});

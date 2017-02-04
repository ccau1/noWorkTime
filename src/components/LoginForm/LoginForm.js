import React, { Component, PropTypes } from 'react';
import {View, TextInput, Text, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles';

class LoginForm extends Component {
    static propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func.isRequired,
    };

    constructor(props: any): void {
        super(props);

        this.state = {
          username: '',
          password: '',
        };
    }

    render() {
        return (
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <TextInput
                placeholder="username or email"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                onChangeText={(text) => this.setState({username: text})}
                />
              <TextInput
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                returnKeyType="go"
                onSubmitEditing={() => this.props.onSubmit.bind(this, this.state)}
                secureTextEntry
                style={styles.input}
                ref={(input) => { this.passwordInput = input; }}
                onChangeText={(text) => this.setState({password: text})}
                />
              <TouchableOpacity ref={(btn) => { this.submitButton = btn; }} style={styles.buttonContainer} onPress={this.props.onSubmit.bind(this, this.state)}>
                <Text style={styles.buttonText}>
                  LOGIN
                </Text>
              </TouchableOpacity>
            </View>
        );
    }
}

export default LoginForm;

import React, { Component, PropTypes } from 'react';
import { View, Text, Image, KeyboardAvoidingView } from 'react-native';
import styles from './styles';

import LoginForm from '../../components/LoginForm/LoginForm';

class Login extends Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    constructor(props: any): void {
        super(props);
    }

    render() {
        return (
          <Image
            style={styles.backgroundImg}
            source={require('../../images/bg_home1.jpg')}
            blurRadius={10}
            >
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('../../images/logo.png')}
                  />
                <Text style={styles.title}>An app made for me to make some random stuff</Text>
              </View>
              <View style={styles.formContainer}>
                <LoginForm onSubmit={this.props.onSubmit.bind(this)} />
              </View>
            </KeyboardAvoidingView>
          </Image>
        );
    }
}

export default Login;

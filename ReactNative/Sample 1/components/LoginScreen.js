import React, { Component } from 'react'
import { Keyboard, Alert, TouchableOpacity, Text, View, TextInput } from 'react-native'
import GlobalStyles from '../global/styles'
import GlobalStrings from '../global/strings'
import GlobalColors from '../global/colors'

export default class LoginSCreen extends Component {

    static navigationOptions = {
        title: GlobalStrings.login,
        headerTitleStyle: GlobalStyles.toolBarStyle,
        headerLeft: null,
        headerStyle: {
            backgroundColor: GlobalColors.blue.light,
        },
        // titleStyle: {
        //     color: 'white'
        // },
        // tintColor: 'white'
    };

    constructor(props) {
        super(props);
        this.state = {
            username: 'admin',
            password: 'admin'
        }
    }

    loginPress = () => {
        if (this.state.username == 'admin' &&
            this.state.password == 'admin') {
            Keyboard.dismiss();
            this.props.navigation.navigate('AllStudents');
        } else {
            Alert.alert("", GlobalStrings.invalidcredi)
        }
    }

    // componentWillUnmount() {
    //     Keyboard.dismiss();
    // }

    render() {
        return (
            <View style={GlobalStyles.container}>
                <TextInput
                    onSubmitEditing={() => {
                        this.refs.password.focus();
                    }}
                    returnKeyType="next"
                    autoFocus={false}
                    value="admin"
                    onChangeText={(username) => this.setState({ username })}
                    placeholder={GlobalStrings.enterUserName}
                    style={GlobalStyles.textInput}></TextInput>
                <TextInput
                    returnKeyType="done"
                    ref="password"
                    autoFocus={false}
                    value="admin"
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={GlobalStrings.enterPassword}
                    style={GlobalStyles.textInput} secureTextEntry={true}></TextInput>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={GlobalStyles.buttonStyle}
                    onPress={this.loginPress}>
                    <Text style={GlobalStyles.buttonTextStyle}> {GlobalStrings.login} </Text>
                </TouchableOpacity>
            </View >
        )
    }
}
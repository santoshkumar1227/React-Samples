import React, { Component } from 'react'
import { ScrollView, Alert, TouchableOpacity, StyleSheet, TextInput, View, Text } from 'react-native'
import GlobalStyles from '../global/styles'
import GlobalStrings from '../global/strings'
import GlobalColors from '../global/colors'
import { areTwoStringsEqual, validateEmail } from '../components/commons/Commons'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { insertNewAdmin } from '../database/allSchemas'

export default class AdminRegistration extends Component {

    static navigationOptions = () => {
        return {
            headerTitle: GlobalStrings.adminRegister,
            headerTitleStyle: GlobalStyles.toolBarStyle,
            headerStyle: {
                backgroundColor: GlobalColors.blue.light,
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            showIndicator: false
        }
    }

    _register = () => {
        var { name, username, password, confirmPassword, email } = this.state;
        var validaitonMessage = '';
        if (name != null && name != "") {
            if (username != null && username != "") {
                if (password != null && password != "") {
                    if (confirmPassword != null && confirmPassword != "") {
                        if (areTwoStringsEqual(confirmPassword, password)) {
                            if (email != null && email != '' && validateEmail(email)) {
                                const admin = {
                                    adminName: name,
                                    adminUserName: username,
                                    adminEmail: email,
                                    adminPassword: password
                                }

                                this.setState({
                                    showIndicator: true
                                });

                                insertNewAdmin(admin).then(() => {
                                    Alert.alert("", GlobalStrings.adminAddedsuccess);
                                    this.setState({
                                        name: '',
                                        username: '',
                                        password: '',
                                        confirmPassword: '',
                                        email: '',
                                    });
                                }).catch((error) => {
                                    alert(`Student Insertion Error : ${error}`);
                                });

                                this.setState({
                                    showIndicator: false
                                });

                            } else {
                                validaitonMessage = GlobalStrings.enterEmail;
                            }
                        } else {
                            validaitonMessage = GlobalStrings.passwordNotMatching;
                        }
                    } else {
                        validaitonMessage = GlobalStrings.enterConfPassword;
                    }
                } else {
                    validaitonMessage = GlobalStrings.enterPassword;
                }
            } else {
                validaitonMessage = GlobalStrings.enterUserName;
            }
        } else {
            validaitonMessage = GlobalStrings.enterName;
        }

        if (validaitonMessage != '')
            Alert.alert("", validaitonMessage)
    }

    render() {
        return (
            <ScrollView style={{
                backgroundColor: GlobalColors.white.default,
                paddingTop: 20
            }}>
                <View style={GlobalStyles.container}>
                    <CustomStatusBar />

                    <View style={GlobalStyles.textInputIconParent}>
                        <Icon name="user" size={18}
                            color={GlobalColors.black.default}></Icon>
                        <TextInput
                            onSubmitEditing={() => {
                                this.refs.username.focus();
                            }}
                            returnKeyType="next"
                            autoFocus={false}
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            placeholder={GlobalStrings.name}
                            style={GlobalStyles.textInputWithIcon}></TextInput>
                    </View>

                    <View style={GlobalStyles.textInputIconParent}>
                        <Icon name="user" size={18}
                            color={GlobalColors.black.default}></Icon>
                        <TextInput
                            onSubmitEditing={() => {
                                this.refs.pwd.focus();
                            }}
                            ref="username"
                            returnKeyType="next"
                            autoFocus={false}
                            value={this.state.username}
                            onChangeText={(username) => this.setState({ username })}
                            placeholder={GlobalStrings.uname}
                            style={GlobalStyles.textInputWithIcon}></TextInput>
                    </View>

                    <View style={GlobalStyles.textInputIconParent}>
                        <Icon name="lock" size={18}
                            color={GlobalColors.black.default}></Icon>
                        <TextInput
                            onSubmitEditing={() => {
                                this.refs.cpwd.focus();
                            }}
                            ref="pwd"
                            returnKeyType="next"
                            autoFocus={false}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                            placeholder={GlobalStrings.pwd}
                            style={GlobalStyles.textInputWithIcon}></TextInput>
                    </View>

                    <View style={GlobalStyles.textInputIconParent}>
                        <Icon name="lock" size={18}
                            color={GlobalColors.black.default}></Icon>
                        <TextInput
                            onSubmitEditing={() => {
                                this.refs.email.focus();
                            }}
                            ref="cpwd"
                            returnKeyType="next"
                            autoFocus={false}
                            secureTextEntry={true}
                            value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                            placeholder={GlobalStrings.cpwd}
                            style={GlobalStyles.textInputWithIcon}></TextInput>
                    </View>

                    <View style={GlobalStyles.textInputIconParent}>
                        <Icon name="envelope" size={18}
                            color={GlobalColors.black.default}></Icon>
                        <TextInput
                            ref="email"
                            returnKeyType="done"
                            autoFocus={false}
                            keyboardType="email-address"
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                            placeholder={GlobalStrings.email}
                            style={GlobalStyles.textInputWithIcon}></TextInput>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={GlobalStyles.buttonStyle}
                        onPress={this._register}>
                        <Text style={GlobalStyles.buttonTextStyle}> {GlobalStrings.registerAdmin} </Text>
                    </TouchableOpacity>

                    <CustomActivityIndicator showIndicator={this.state.showIndicator}></CustomActivityIndicator>

                </View>
            </ScrollView>
        )
    }
}
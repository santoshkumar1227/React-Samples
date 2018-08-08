import React, { Component } from 'react'
import { DatePickerAndroid, Image, Keyboard, BackHandler, ScrollView, Alert, TouchableOpacity, StatusBar, Picker, TextInput, Text, View } from 'react-native'
import Button from 'react-native-button'
import GlobalStyles from '../global/styles'
import GlobalStrings from '../global/strings'
import GlobalColors from '../global/colors'
import realm from '../database/allSchemas'
import { insertNewstudent, updateStudent, STUDENT_SCHEMA } from '../database/allSchemas'
import { validateEmail, validatePhone, isAndroid } from './commons/Commons'
import CustomActivityIndicator from './commons/CustomActivityIndicator'
import DatePicker from 'react-native-datepicker'
import CustomRadioGroup from '../components/commons/CustomRadioGroup';

var ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Choose Image',
    // customButtons: [
    //     { name: 'fb', title: 'Choose Photo from Facebook' },
    // ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

var radio_props = [
    { label: 'Male', value: 'Male', disabled: false },
    { label: 'Female', value: 'Female', disabled: false }
]

export default class AddStudent extends Component {

    static navigationOptions = {
        title: GlobalStrings.addStudent,
        headerTitleStyle: GlobalStyles.toolBarStyle,
        headerStyle: {
            backgroundColor: GlobalColors.blue.light,
        },
        // titleStyle: {
        //     color: 'white'
        // },
        // tintColor: 'white'
    };


    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    constructor(props) {
        super(props);

        // randomId = () => {
        //     queryAllStudents().then((allStudents) => {
        //         return allStudents.length + ""
        //     }).catch((error) => {
        //         return 0 + ""
        //     });
        // }


        //randomId = "123"
        //  OS = isAndroid();

        this.state = {
            id: '',
            name: '',
            phoneno: '',
            className: '',
            gender: '',
            email: '',
            randomId: realm
                ? realm.objects(STUDENT_SCHEMA).length
                : 0,
            avatarSource: null,
            showIndicator: false,
            date_in: null,

        }
    }



    pickImage = () => {
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    componentWillMount() {
        const { navigation } = this.props;
        const studentToEdit = navigation.getParam('student', null);
        if (studentToEdit != null) {
            selectedIndex = radio_props.findIndex(e => e.value == studentToEdit.stGender);
            this.setState({
                name: studentToEdit.stName,
                phoneno: studentToEdit.stPhone,
                className: studentToEdit.stClass,
                gender: studentToEdit.stGender,
                email: studentToEdit.stRefEmail,
                randomId: studentToEdit.studentId,
                date_in: studentToEdit.stDOJ,
                radio_props: radio_props[selectedIndex].selected = true
            });
        }
    }


    addStudent = () => {
        var validationMessage = '';
        if (this.state.name != null && this.state.name != "") {
            if (this.state.phoneno != null && this.state.phoneno != "" && validatePhone(this.state.phoneno)) {
                if (this.state.className != null && this.state.className != "") {
                    if (this.state.email != null && this.state.email != "" && validateEmail(this.state.email)) {
                        if (this.state.date_in != null && this.state.date_in != "") {
                            if (this.state.gender != null && this.state.gender != "") {
                                console.log('====================================');
                                console.log(this.state.gender);
                                console.log('====================================');
                                //  Alert.alert("Adding..", "Successful");
                                const student = {
                                    studentId: this.state.randomId,
                                    stName: this.state.name,
                                    stPhone: this.state.phoneno,
                                    stClass: this.state.className,
                                    stRefEmail: this.state.email,
                                    stGender: this.state.gender,
                                    stDOJ: this.state.date_in
                                }

                                this.setState({
                                    showIndicator: true
                                });

                                const { navigation } = this.props;
                                const status = navigation.getParam('status', null);

                                if (status != null && status == 'edit') {
                                    updateStudent(student).then(() => {
                                        Alert.alert("", GlobalStrings.studentUpdatesuccess);
                                        this.setState({
                                            randomId: this.state.randomId + 1,
                                            name: '',
                                            phoneno: '',
                                            className: '',
                                            gender: '',
                                            email: '',
                                            showIndicator: false
                                        });

                                    }).catch((error) => {
                                        this.setState({
                                            showIndicator: false
                                        });
                                        alert(`Student Updation Error :  ${error}`);
                                    });
                                } else {
                                    insertNewstudent(student).then(() => {
                                        Alert.alert("", GlobalStrings.studentAddedsuccess);
                                        this.setState({
                                            randomId: this.state.randomId + 1,
                                            name: '',
                                            phoneno: '',
                                            className: '',
                                            gender: '',
                                            email: '',
                                            showIndicator: false
                                        });

                                    }).catch((error) => {
                                        this.setState({
                                            showIndicator: false
                                        });
                                        alert(`Student Insertion Error : ${error}`);
                                    });
                                }

                                this.props.navigation.navigate("AllStudents");

                            } else {
                                validationMessage = GlobalStrings.selectGender;
                            }
                        } else {
                            validationMessage = GlobalStrings.selectDate;
                        }
                    } else {
                        validationMessage = GlobalStrings.enterEmail;
                    }
                } else {
                    validationMessage = GlobalStrings.enerStudentBranch;
                }
            } else {
                validationMessage = GlobalStrings.enerStudentPhone;
            }
        } else {
            validationMessage = GlobalStrings.enerStudentName;
        }
        if (validationMessage != null && validationMessage != "") {
            Alert.alert("", validationMessage);
        }
    }

    // componentDidMount() {
    //     this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         // this.goBack(); // works best when the goBack is async
    //         //  alert("Back");
    //         // BackHandler.exitApp()
    //         Keyboard.dismiss();
    //         return true;
    //     });
    // }

    // componentWillUnmount() {
    //     this.backHandler.remove();
    // }

    render() {
        return (
            <ScrollView style={{ backgroundColor: GlobalColors.white.default }}>
                <View style={GlobalStyles.container}>
                    <StatusBar
                        backgroundColor={GlobalColors.blue.dark}
                        barStyle="dark-content"
                    />
                    <View style={{ width: '100%', height: 60, justifyContent: 'center', alignContent: 'center' }}>
                        <Text
                            style={GlobalStyles.contentMainHeading}
                        > {GlobalStrings.welcomeSchool} </Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={GlobalStyles.circle}>
                            <Image
                                style={{ height: 75, width: 75 }}
                                resizeMode='contain'
                                // source={this.state.avatarSource}
                                source={
                                    (this.state.avatarSource == null) ?
                                        require('../images/Profile-icon-9.png') : this.state.avatarSource
                                }
                            />
                        </View>

                        <View style={{ height: '100%', justifyContent: 'flex-end', paddingBottom: 10 }}>
                            <Button
                                onPress={this.pickImage}
                                activeOpacity={0.5} style={[GlobalStyles.buttonStyle,
                                GlobalStyles.buttonUndefinedwidht]}>Upload Image</Button>
                        </View>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>

                        <TextInput
                            ref="id"
                            onSubmitEditing={() => {
                                this.refs.name.focus();
                            }}
                            returnKeyType="next"
                            style={GlobalStyles.textInput}
                            keyboardType='numeric'
                            maxLength={5}
                            value={this.state.randomId + ''} // String only accepts
                            editable={false}
                            placeholder={GlobalStrings.enerStudentId}
                        // onChangeText={(id) => this.setState({ id })}
                        />

                        <TextInput
                            ref="name"
                            value={this.state.name}
                            onSubmitEditing={() => {
                                this.refs.phone.focus();
                            }}
                            returnKeyType="next"
                            style={GlobalStyles.textInput}
                            placeholder={GlobalStrings.name}
                            onChangeText={(name) => this.setState({ name })}
                        />

                        <TextInput
                            ref="phone"
                            value={this.state.phoneno}
                            onSubmitEditing={() => {
                                this.refs.email.focus();
                            }}
                            returnKeyType="next"
                            keyboardType='phone-pad'
                            maxLength={10}
                            style={GlobalStyles.textInput}
                            placeholder={GlobalStrings.phoneNo}
                            onChangeText={(phoneno) => this.setState({ phoneno })}
                        />

                        {/* <TextInput
                            ref="class"
                            value={this.state.className}
                            onSubmitEditing={() => {
                                this.refs.email.focus();
                            }}
                            returnKeyType="next"
                            style={GlobalStyles.textInput}
                            placeholder={GlobalStrings.enerStudentBranch}
                            onChangeText={(className) => this.setState({ className })}
                        /> */}

                        <View style={{ fontSize: 10, height: 50, borderRadius: 5, margin: 10, justifyContent: 'center', height: 40, width: '80%', borderWidth: 1, borderColor: GlobalColors.black.absolute }}>
                            <Picker
                                mode="dropdown"
                                selectedValue={this.state.className}
                                style={{
                                    width: '80%',
                                    color: GlobalColors.black.default,
                                    height: 40,
                                    backgroundColor: 'transparent',
                                    width: '80%'
                                }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ className: itemValue })}>
                                <Picker.Item label="LKG" value="LKG" />
                                <Picker.Item label="UKG" value="UKG" />
                                <Picker.Item label="1st class" value="1st class" />
                                <Picker.Item label="2nd class" value="2nd class" />
                                <Picker.Item label="3rd class" value="3rd class" />
                                <Picker.Item label="4th class" value="4th class" />
                                <Picker.Item label="5th class" value="5th class" />
                                <Picker.Item label="6th class" value="6th class" />
                                <Picker.Item label="7th class" value="7th class" />
                                <Picker.Item label="8th class" value="8th class" />
                                <Picker.Item label="9th class" value="9th class" />
                                <Picker.Item label="10th class" value="10th class" />
                            </Picker>
                        </View>

                        <TextInput
                            ref="email"
                            value={this.state.email}
                            onSubmitEditing={() => {
                                this.addStudent
                            }}
                            keyboardType='email-address'
                            returnKeyType="done"
                            style={GlobalStyles.textInput}
                            placeholder={GlobalStrings.email}
                            onChangeText={(email) => this.setState({ email })}
                        />

                        <TouchableOpacity
                            style={GlobalStyles.textInput}
                            activeOpacity={1}
                            onPress={this.renderDatePickerAndroid}>

                            <TextInput
                                style={{ color: GlobalColors.black.default }}
                                placeholder={GlobalStrings.dob}
                                value={this.state.date_in}
                                editable={false}
                                selectTextOnFocus={false}></TextInput>
                        </TouchableOpacity>


                        {/* <DatePicker
                            style={{
                                marginTop: 10,
                                width: '80%',
                                borderColor: 'black',
                                color: 'black',
                            }}
                            date={this.state.date_in}
                            mode="date"
                            placeholder={GlobalStrings.selectDate}
                            format="YYYY-MM-DD"
                            // minDate="2016-05-01"
                            // maxDate="2016-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            customStyles={{
                                // dateIcon: {
                                //     position: 'absolute',
                                //     left: 0,
                                //     top: 4,
                                //     marginLeft: 0
                                // },
                                dateInput: {
                                    color: 'black',
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    borderRadius: 5,
                                    paddingLeft: 15,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ date_in: date }) }}
                        /> */}

                        <View
                            style={
                                {
                                    paddingLeft: 10,
                                    height: 40,
                                    width: '80%',
                                    borderRadius: 5,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }
                            }
                        >

                            <Text>{GlobalStrings.gender}</Text>
                            <CustomRadioGroup
                                color={GlobalColors.gray.absolute}
                                bubbleColor='red'
                                justifyContent='flex-start'
                                flexDirection='row'
                                alignItems='left'
                                radioButtons={radio_props}
                                onPress={this.onPress} />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={GlobalStyles.buttonStyle}
                            styleDisabled={{ color: 'red' }}
                            onPress={this.addStudent}>
                            <Text style={GlobalStyles.buttonTextStyle}> {GlobalStrings.add} </Text>
                        </TouchableOpacity>

                        <CustomActivityIndicator showIndicator={this.state.showIndicator}></CustomActivityIndicator>

                    </View>
                </View>
            </ScrollView>
        )
    }

    // update state
    onPress = selectedButton => {
        this.setState({ gender: selectedButton });
    }

    renderDatePickerAndroid = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                // date: new Date(2020, 4, 25)
                date: new Date()
            });

            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                const date_in_temp = day + "/" + (month + 1) + "/" + year
                await this.setStateAsync
                    ({
                        date_in: date_in_temp
                    });
            }
        } catch ({ code, message }) {
            console.warn(message);
        }
    }

}


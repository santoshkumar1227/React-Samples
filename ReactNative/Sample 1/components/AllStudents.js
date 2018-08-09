import React, { Component } from 'react'
import { Button, ActivityIndicator, RefreshControl, Image, Alert, StatusBar, TouchableOpacity, Text, View, FlatList } from 'react-native'
import GlobalStyles from '../global/styles'
import GlobalStrings from '../global/strings'
import GlobalColors from '../global/colors'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { queryAllStudents, deleteStudent } from '../database/allSchemas';
import CustomActivityIndicator from '../components/commons/CustomActivityIndicator'
import { navigateWithParams, navigateAfterFinish } from '../components/commons/Commons'

export default class AllStudents extends Component {

  // static navigationOptions = {
  //   title: GlobalStrings.students,
  //   headerLeft: null,
  //   headerTitleStyle: GlobalStyles.toolBarStyle,
  //   headerStyle: {
  //     backgroundColor: GlobalColors.blue.light,
  //   },
  //   headerRight: (
  //     [
  //       <Button
  //         onPress={() => alert('This is a button!')}
  //         title="Logout"
  //         color={GlobalColors.blue.light}
  //       />
  //     ]
  //   )
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: GlobalStrings.students,
      headerLeft: null,
      headerTitleStyle: GlobalStyles.toolBarStyle,
      headerStyle: {
        backgroundColor: GlobalColors.blue.light,
      },
      headerRight: (
        <Button
          onPress={() =>
            Alert.alert(
              "",
              "Do You want to logout ",
              [
                {
                  text: 'NO', onPress: () => {

                  }, style: 'cancel'
                },
                {
                  text: 'YES', onPress: () => {
                    navigation.navigate('Login')
                  }
                },
              ],
              { cancelable: false }
            )
          }
          title="Logout"
          color={GlobalColors.blue.light}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      refreshing: false,
      showIndicator: true,
    };
  }

  renderItem({ item, index }) {
    return (
      <View style={{ borderRadius: 5, margin: 10, padding: 5, paddingBottom: 15, backgroundColor: 'gray' }}>

        <Text style={GlobalStyles.itemCenter}>{item.stName} ({item.stClass}) - {item.stGender}</Text>

        <Text style={GlobalStyles.item}>{item.stPhone}</Text>

        <Text style={GlobalStyles.item}>{item.stRefEmail}</Text>

        <Text style={GlobalStyles.item}>Date of Join : {item.stDOJ}</Text>

        <View
          style={GlobalStyles.rightImageButton}
        >


          <TouchableOpacity
            onPress={() => this.actionEdit(item)}
          >
            <Image
              style={{ height: 20, width: 20, }}
              resizeMode='contain'
              source={require('../images/edit.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.actionOnRow(item)}
          >
            {/* <Icon name="action-redo" size={18}
              color={GlobalColors.white.default} /> */}
            <Image
              style={{ height: 22, width: 22, marginLeft: 10 }}
              resizeMode='contain'
              source={require('../images/icons8-trash-48.png')} />
          </TouchableOpacity>
        </View>


      </View >);
  }


  ItemSeparatorComponent = () => {
    return null //<View style={{ height: 1, backgroundColor: GlobalColors.blue.dark }}></View>
  }

  listHeaderComponent = () => {
    return (
      <View style={{
        margin: 10, padding: 10, justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 5, backgroundColor: 'gray'
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: GlobalColors.white.default }}>
          Total Students are : {this.state.students.length}
        </Text>
      </View>);
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentWillMount();
  }

  componentWillMount() {
    this.getAllStudents();
    // Alert.alert("", "componentWillMount");
  }

  // componentWillUpdate(nextProps, nextState) {
  //   Alert.alert("", "componentWillUpdate");
  // }

  // componentDidMount() {
  //   Alert.alert("", "componentDidMount");

  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   Alert.alert("", "shouldComponentUpdate");
  //   return true;
  // }

  // componentDidUpdate(nextProps, nextState) {
  //   Alert.alert("", "componentDidUpdate");
  // }

  // componentWillUnmount() {
  //   Alert.alert("", "componentWillUnmount");
  // }

  // componentWillReceiveProps(nextProps) {
  //   Alert.alert("", "componentWillReceiveProps");
  // }

  getAllStudents = () => {
    queryAllStudents().then((students) => {
      this.setState({ students, refreshing: false, showIndicator: false });
    }).catch((error) => {
      this.setState({ students: [], refreshing: false });
      alert(error);
    });
  }

  actionEdit = (item) => {
    this.props.navigation.navigate('AddStudent', {
      student: item,
      status: 'edit'
    });
  }

  actionOnRow = (item) => {
    // Alert.alert("", 'Selected Item : ' + item.stName);

    Alert.alert(
      GlobalStrings.deleteStudent,
      GlobalStrings.deleteStudentConf + " " + item.stName + " ? ",
      [
        {
          text: 'NO', onPress: () => {

          }, style: 'cancel'
        },
        {
          text: 'YES', onPress: () => {
            deleteStudent(item.studentId).then(() => {
              Alert.alert("", GlobalStrings.studentDeleteSuccess);
              this.componentWillMount();
            }).catch((error) => {
              alert(`Delete Student error ${error}`);
            });

          }
        },
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <StatusBar
          backgroundColor={GlobalColors.blue.dark}
          barStyle="light-content"
        />

        <FlatList
          refreshControl={
            <RefreshControl
              // progressBackgroundColor={GlobalColors.blue.default}
              colors={[GlobalColors.blue.default, "red", "green"]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
          style={{ width: '100%', paddingBottom: 100 }}
          data={this.state.students}
          keyExtractor={item => item.studentId + ""}
          //  renderItem={({ item }) => <Text style={GlobalStyles.item}>{item.key}</Text>}
          renderItem={this.renderItem.bind(this)}

          // ItemSeparatorComponent={() =>
          //   <View style={{ height: 3, backgroundColor: GlobalColors.blue.dark }}></View>
          // }
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          ListHeaderComponent={this.listHeaderComponent}
        />

        <View style={GlobalStyles.floatingParent}>
          <TouchableOpacity
            style={GlobalStyles.floatingActionButton}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('AddStudent')}>

            {/* <Icon name="plus" size={18}
              color={GlobalColors.white.default} /> */}

            <Image style={{ height: 25, width: 25 }} source={require('../images/add_student_1.png')} />

          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.floatingActionButton}
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('SectionStudents')}>

            {/* <Icon name="plus" size={18}
              color={GlobalColors.white.default} /> */}

            <Image style={{ height: 25, width: 25 }} source={require('../images/if_group.png')} />

          </TouchableOpacity>

        </View>

        <CustomActivityIndicator showIndicator={this.state.showIndicator}></CustomActivityIndicator>

        {(this.state.students != null && this.state.students.length != 0) ? null :
          <Text style={{ position: 'absolute', color: GlobalColors.black.default }}> No Student added.</Text>}

      </View>
    )
  }
}


/** @format */

import { AppRegistry } from 'react-native';
import AddStudent from './components/AddStudent';
import { name as appName } from './app.json';

import {
  createStackNavigator,
} from 'react-navigation';

import SplashScreen from './components/SplashScreen';
import AllStudents from './components/AllStudents';
import LoginSCreen from './components/LoginScreen';

const App = createStackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Login: {
    screen: LoginSCreen,
    header: {
      left: null,
    }
  },
  AddStudent: {
    screen: AddStudent,
    // header: {
    //   left: null,
    // }
  },
  AllStudents: {
    screen: AllStudents,
    header: {
      left: null,
    }
  },
  //Profile: { screen: ProfileScreen },
});

AppRegistry.registerComponent(appName, () => App);

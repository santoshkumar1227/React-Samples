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
import SectionWiseStudents from './components/SectionWiseStudents';
import AdminRegistration from './components/AdminRegistration';

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
  },
  AllStudents: {
    screen: AllStudents,
    header: {
      left: null,
    }
  }, SectionStudents: {
    screen: SectionWiseStudents,
  }, AdminRegister: {
    screen: AdminRegistration,
  },
});

AppRegistry.registerComponent(appName, () => App);

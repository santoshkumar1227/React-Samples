import { Alert, Platform } from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';

export const validateEmail = (email) => {
    console.log(email);
    //  Alert.alert(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
        console.log("Email is Not Correct");
        return false;
    } else {
        console.log("Email is Correct");
        return true;
    }
}

export const validatePhone = (phone) => {
    console.log(phone);
    let reg = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (reg.test(phone) === false) {
        console.log("phone No is Not Correct");
        return false;
    } else {
        console.log("Emaphone No is Correct");
        return true;
    }
}

export const navigateAfterFinish = (screen, props) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: screen })
        ]
    });
    props.navigation.dispatch(resetAction);
}

export const navigateWithParams = (screen, props) => {
    NavigationActions.navigate(screen, {
        student: props,
        mode: 'edit'
    });
}

export const isAndroid = () => {
    if (Platform.OS === 'android') {
        return true;
    } else {
        return false;
    }
}

export const areTwoStringsEqual = (firstString, SecondString) => {
    if (firstString == SecondString) {
        return true;
    } else {
        return false;
    }
}
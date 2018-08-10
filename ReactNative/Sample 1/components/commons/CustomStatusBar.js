import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import GlobalColors from '../../global/colors'

export default CustomStatusBar = () => {
    return (
        <StatusBar
            backgroundColor={GlobalColors.blue.dark}
            barStyle="light-content"
        />
    );
}


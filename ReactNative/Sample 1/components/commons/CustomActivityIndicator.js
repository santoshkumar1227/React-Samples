import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import GlobalStyles from '../../global/styles'
import GlobalColors from '../../global/colors'

export default CustomActivityIndicator = (props) => {
    return (
        props.showIndicator ?
            <ActivityIndicator style={GlobalStyles.activityIndicator} size="large" color={GlobalColors.blue.default} />
            : null
    );
}


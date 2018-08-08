import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import GLobalSyles from '../global/styles'
import GLobalColors from '../global/colors'
import {navigateAfterFinish} from '../components/commons/Commons'

export default class SplashScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            nextScreen: false
        }
    }

    componentDidMount() {
        this._interval = setTimeout(() => {
            this.setState({
                nextScreen: true
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return (
            <View style={[GLobalSyles.container]}>
                <View style={GLobalSyles.circle}>
                    <Image
                        style={{ height: 75, width: 75 }}
                        resizeMode='contain'
                        source={require('../images/school.png')} />
                </View>

                {
                    this.state.nextScreen ? navigateAfterFinish('Login',this.props) : null
                }
            </View>
        );
    }

   
}
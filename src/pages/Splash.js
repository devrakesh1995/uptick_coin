import React, { Component } from 'react';
import {
  View, Text, ImageBackground, StatusBar,
  Image, Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window')

export default class Splash extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {

    return (

      <View style={{ flex: 1, backgroundColor: '#b62127', justifyContent: 'center' }}>
        <View style={{ padding:20, borderRadius: 100, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
          <Image style={{ height: 140, width: 140 }} source={require('../Statics/img/Wallet/logo_white.png')} />
        </View>
      </View>

    )
  }
}

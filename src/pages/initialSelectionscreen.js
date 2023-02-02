import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {
  View, Text, Dimensions,
  Image, TouchableOpacity, BackHandler, Alert, SafeAreaView
} from 'react-native';

const { height, width } = Dimensions.get('window')


class initialSelectionscreen extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
    }
  }

  gotoNextScreen = (router) => {
    this.props.navigation.navigate(router)
  }

  onButtonPress = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    navigate('NewScreen');
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      },], {
      cancelable: false
    }
    )
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  render() {

    return (
      <SafeAreaView>

        <View style={{ height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ flex: 1 }} >
            <View style={{ marginTop: 30, height: 50, width: width, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: '100%', width: 20, backgroundColor: '#E5E5E5', borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
              <Text style={{ fontSize: 30, color: '#E5E5E5', textShadowOffset: { width: 1, height: 1 }, }}> WELCOME </Text>
            </View>

            <View style={{ flex: 0.9, marginTop: 75 }}>
              <View style={{ padding: 15, borderRadius: 110, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Image style={{ height: 155, width: 155 }} source={require('../Statics/img/Wallet/logo_white.png')} />
              </View>
              {/* <Text style={{ fontSize: 25, color: '#FFF',  marginTop: -15, fontWeight: "bold" }}> UPTICK </Text> */}

              <View style={{ borderRadius: 5, marginHorizontal: 20, marginTop: 65, marginBottom: 20, elevation: 8 }}>
                <View style={{ backgroundColor: '#b62127', height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                  <TouchableOpacity style={{ width: '100%' }}
                    onPress={() => this.gotoNextScreen('Login')}
                  >
                    <Text style={{ fontSize: 19, color: '#FFF', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, }}> LOGIN </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ borderRadius: 5, marginHorizontal: 20, marginBottom: 20, elevation: 8 }}>
                <View style={{ backgroundColor: '#b62127', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', }}>
                  <TouchableOpacity style={{ width: '100%' }}
                    onPress={() => this.gotoNextScreen('Register')}>
                    <Text style={{ fontSize: 19, color: '#FFF', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, }}> REGISTER </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

    )
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users } = state;
  return {
    loggingIn,
    users
  };
}
export default connect(mapStateToProps)(initialSelectionscreen);
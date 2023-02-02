import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';

import {
  Image,
  View, Text, Dimensions, TouchableOpacity, ScrollView, TextInput, SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: ''
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.users.UserLoginFailure) {
      return {
        ...nextProps,
        failureMSG: 'Please enter valid username!'
      }
    }
    if (nextProps.users.UserLoginOTPFailure) {
      return {
        ...nextProps,
        failureOTPMSG: 'Invalid OTP or expired!'
      }
    }
    if (nextProps.users.UserLoginEmailSuccess) {
      return {
        ...nextProps,
        showLogin: false
      }
    }
    else {
      return {
        ...nextProps
      }
    }
  }
  async componentDidMount() {
    await AsyncStorage.removeItem('UserData');
  }



  handleLoginInput = (text) => {
    this.setState({ email: text })
  }
  handleLoginInputPassword = (text) => {
    this.setState({ password: text })
  }
  submitLogin = () => {
    let data = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.dispatch(userActions.register(data, this.props));
  }
  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        email: this.state.email,
        password: this.state.password,
        otp: this.state.otp
      }
      this.props.dispatch(userActions.validateOtp(data, this.props));
    }
  }
  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }


  gotoIntroScreen = (router) => {
    this.props.navigation.navigate(router)
  }


  render() {
    let { email, password, failureMSG } = this.state;

    return (
      <SafeAreaView>
        <View style={{ height: '100%', backgroundColor: '#E5E5E5' }}>

          <View style={{ marginVertical: 40 }} >

            <ScrollView>
              <View style={{  padding: 15, borderRadius: 90, backgroundColor: '#FFF', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{height: 80, width: 80, }} source={require('../../Statics/img/Wallet/logo_white.png')} />
              </View>

              <View style={{ alignItems: 'center', marginVertical: 25 }}>
                <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#b62127',
                }}>SIGN UP</Text>
              </View>


              <View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
                {/* {this.state.showLogin ?
                  <> */}
                <View style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
                  <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 10 }}>
                    <View style={{ borderRadius: 10, }}>

                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 30, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Email"
                          placeholderTextColor="gray"
                          name="email"
                          onChangeText={(text) => this.handleLoginInput(text)}
                          value={email}
                        />
                      </View>

                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Password"
                          placeholderTextColor="gray"
                          name="password"
                          secureTextEntry={true}
                          onChangeText={(text) => this.handleLoginInputPassword(text)}
                          value={password} />
                      </View>
                      <View style={{ borderColor: '#b62127', borderRadius: 5, marginHorizontal: 20, marginBottom: 30, marginTop: 60, elevation: 8 }}>
                        <View style={{ backgroundColor: '#b62127', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62127' }}>

                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.submitLogin()}>
                            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', fontWeight: '600', textShadowOffset: { width: 1, height: 1 }, }}> REGISTER </Text>

                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={{ height: 35, flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}
                    onPress={() => this.gotoIntroScreen('Login')}
                  >
                    <Text style={{ fontSize: 16, textAlign: 'center', color: '#000', textShadowOffset: { width: 1, height: 1 }, }}> Already have an Account? </Text>
                    <Text style={{ fontSize: 17, textAlign: 'center', color: '#b62127', textShadowOffset: { width: 1, height: 1 }, }}> Sign In </Text>
                  </TouchableOpacity>
                </View>
                {/* </>
                  :
                  <> */}
                {/* <Text style={{ padding: 19, fontSize: 22, fontWeight: 'bold', color: '#000', textShadowOffset: { width: 1, height: 1 }, }}>Verification</Text>
                    <Text style={{ paddingLeft: 20, color: '#000', fontSize: 14, fontWeight: 'normal', textShadowOffset: { width: 1, height: 1 }, }}>
                      OTP sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text>
                    </Text>
                    <TextInput
                      style={{
                        height: 40,
                        borderWidth: 2,
                        marginLeft: 20,
                        width: 320,
                        borderBottomColor: '#3498eb',
                        borderLeftColor: '#fff',
                        borderRightColor: '#fff',
                        borderTopColor: '#fff'
                      }}
                      name="otp"
                      onChangeText={(text) => this.handleVerificationInput(text)}
                      value={this.state.otp}
                    />
                    <Text style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginTop: 15,
                      width: 350,
                      textAlign: 'center',
                      color: '#34cceb', textShadowOffset: { width: 1, height: 1 },
                    }}>Expire in: 1:20</Text>
                    <TouchableOpacity onPress={() => this.onSubmitOTP()}>
                      <View
                        style={{
                          width: 220,
                          height: 50,
                          backgroundColor: '#56CCF2',
                          borderRadius: 50,
                          marginTop: 25,
                          marginLeft: 70, elevation: 8

                        }}

                      >
                        <Text style={{
                          marginTop: 13,
                          textAlign: 'center',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 15, textShadowOffset: { width: 1, height: 1 },

                        }}>VERIFY AND PROCEED</Text>
                      </View>
                    </TouchableOpacity>
                  </>} */}
              </View>
            </ScrollView>
          </View>
        </View >
      </SafeAreaView >
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
export default connect(mapStateToProps)(Login);
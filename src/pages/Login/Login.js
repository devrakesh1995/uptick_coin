import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import {
  View, Text, Dimensions,
  TouchableOpacity, ImageBackground, TextInput, Image, SafeAreaView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')
class Login extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(userActions.logout());
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      time: {},
      seconds: 120
    },
      this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
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

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  async componentDidMount() {

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
    this.props.dispatch(userActions.userlogin(data, this.props));
    this.startTimer()
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
    let { email, password } = this.state;

    return (
      <SafeAreaView>
        <View style={{ height: '100%', backgroundColor: '#E5E5E5' }}>

          <View style={{ marginVertical: 40 }} >
            
            <ScrollView>
              <View style={{  padding: 15, borderRadius: 90, backgroundColor: '#FFF', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 80, width: 80, }} source={require('../../Statics/img/Wallet/logo_white.png')} />
              </View>

              <View style={{ alignItems: 'center', marginVertical: 25 }}>
                <Text style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#b62127',
                }}>SIGN IN</Text>
              </View>

              <View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: 10 }}>
                {this.state.showLogin ?
                  <>
                    <View style={{ justifyContent: 'space-between', paddingBottom: 10 }}>
                      <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 10 }}>
                        <View style={{ borderRadius: 10 }}>

                          <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 30, borderRadius: 10 }}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15 }}
                              placeholder="Email"
                              placeholderTextColor='gray'
                              name="email"
                              onChangeText={(text) => this.handleLoginInput(text)}
                              value={email}
                            />
                          </View>

                          <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                            <TextInput
                              style={{ marginHorizontal: 10, fontSize: 15 }}
                              placeholder="Password"
                              placeholderTextColor='gray'
                              name="password"
                              secureTextEntry={true}
                              onChangeText={(text) => this.handleLoginInputPassword(text)}
                              value={password} />
                          </View>
                          <TouchableOpacity
                            onPress={() => this.gotoIntroScreen('Forgot')}
                            style={{ marginTop: 20, alignSelf: 'flex-end', marginRight: 20 }} >
                            <Text style={{ fontSize: 15, color: '#b62127', fontWeight: 'normal' }}> Forgot Password? </Text>
                          </TouchableOpacity>

                          <View style={{ borderRadius: 10, marginHorizontal: 20, marginBottom: 30, marginTop: 45, elevation: 8 }}>
                            <View
                              style={{ backgroundColor: '#b62127', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62127' }}>

                              <TouchableOpacity style={{ width: '100%' }}
                                onPress={() => this.submitLogin()}>
                                <Text style={{ fontSize: 18, color: '#FFF', textAlign: 'center', fontWeight: '600', textShadowOffset: { width: 1, height: 1 }, }}> LOGIN </Text>

                              </TouchableOpacity>
                            </View>

                          </View>
                        </View>
                      </View>
                      <TouchableOpacity style={{ height: 35, flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}
                        onPress={() => this.gotoIntroScreen('Register')} >
                        <Text style={{ fontSize: 16, textAlign: 'center', color: '#000', textShadowOffset: { width: 1, height: 1 }, }}> Create an Account, </Text>
                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#b62127', textShadowOffset: { width: 1, height: 1 }, }}>Sign Up? </Text>
                      </TouchableOpacity>

                    </View>

                  </>
                  :

                  <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 15 }}>
                    <View style={{ borderRadius: 25, }}>

                      <Text style={{ padding: 18, color: '#b62127', fontSize: 22, fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>Verification</Text>
                      <Text style={{ paddingLeft: 19, fontSize: 14, color: '#b62127', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>
                        OTP sent to <Text style={{ fontWeight: 'bold' }}>{email}</Text>
                      </Text>


                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15 }}
                          placeholder="Enter OTP"
                          placeholderTextColor='gray'
                          name="otp"
                          keyboardType='numeric'
                          onChangeText={(text) => this.handleVerificationInput(text)}
                          value={this.state.otp} />
                      </View>


                      <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginTop: 15,
                        textAlign: 'center',
                        color: '#b62127', textShadowOffset: { width: 1, height: 1 },
                      }}>Expire in: {this.state.time.m} : {this.state.time.s}</Text>

                      <View style={{ borderRadius: 5, marginHorizontal: 20, marginBottom: 30, marginTop: 50, elevation: 8 }}>
                        <View
                          style={{ backgroundColor: '#b62127', height: 40, borderRadius: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62127' }}>
                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.onSubmitOTP()}
                          >
                            <Text style={{
                              textAlign: 'center',
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: 15, textShadowOffset: { width: 1, height: 1 },

                            }}>VERIFY AND PROCEED</Text>
                          </TouchableOpacity>
                        </View>

                      </View>

                    </View>
                  </View>

                }
              </View>
            </ScrollView>
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
export default connect(mapStateToProps)(Login);
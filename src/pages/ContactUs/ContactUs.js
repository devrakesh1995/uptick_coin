import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions';
import { dashboardActions } from '../../_actions';


import {
  View, Text, Dimensions,
  TouchableOpacity, TextInput, Image, SafeAreaView
} from 'react-native';
const { height, width } = Dimensions.get('window')


class ContactUs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      formData: {
        "name": "",
        "mobile": "",
        "email": "",
        "message": ""
      }
    }
  }
  componentDidMount() {

  }
  static getDerivedStateFromProps(nextProps) {

    if (nextProps.dashboard.submitEnquirySuccess) {
      return {
        ...nextProps,
        formData: {
          "name": "",
          "mobile": "",
          "email": "",
          "message": ""
        }

      }
    }
    if (nextProps.dashboard.getEmployeeHappinessSuccess) {
      return {
        ...nextProps,
        trackMessage: 'You can see getEmployeeHappinessSuccess here!'

      }
    } else {
      return {
        ...nextProps
      }
    }
    //  https://wallet.UpTickCoin.org/api/v1/createNotification
  }
  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }
  // gotoIntroScreen = () => {
  //   this.props.navigation.navigate('Intro1')
  // }

  // handleLoginInput = (text) => {
  //   this.setState({ email: text })
  // }

  submitContactDetails = () => {
    let { formData } = this.state
    this.props.dispatch(dashboardActions.saveEnqiry(formData, this.props));
  }

  // onSubmitOTP = () => {
  //   const { users } = this.props;
  //   const { UserEmailToken } = users;
  //   if (this.state.otp !== 'NaN') {
  //     let data = {
  //       token: UserEmailToken,
  //       otp: this.state.otp
  //     }

  //     this.props.dispatch(userActions.validateOtp(data, this.props));
  //     this.props.navigation.navigate('Welcome')
  //   }
  // }

  // handleVerificationInput = (text) => {
  //   this.setState({ otp: text })
  // }


  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { clientProfile, getEmployeeHistoryData, getEmployeeTrackerListData } = dashboard;


    return (

      <SafeAreaView>
        <View style={{ width: width, height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ height: '100%', }} >
            <View style={{ height: 50, backgroundColor: '#b62721', }}>
              <View style={{ marginHorizontal: 20, flexDirection: 'row', }}>
                <TouchableOpacity style={{ paddingTop: 10 }} onPress={() => this.props.navigation.goBack()}>
                  <Image style={{
                    width: 28,
                    height: 28,
                  }} source={require('../../Statics/img/Profile/goback.png')} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, paddingTop: 10 }}>Contact Us</Text>
              </View>
            </View>
            <>

            {/* <View style={{}}>
              <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 25,textShadowOffset: { width: 1, height: 1 }, }}>ContactUs</Text>
            </View> */}

              <View style={{ alignItems: 'center', }}>
                <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 15, marginVertical: 25 }}>
                  <View style={{ borderRadius: 17, paddingBottom: 10 }}>
                    <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 30, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, }}
                        placeholder="Name"
                        placeholderTextColor="gray"
                        name="name"
                        value={formData.name}
                        onChangeText={(text) => this.handleInput(text, "name")}
                      />
                    </View>
                    <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, }}
                        placeholder="Email Address"
                        placeholderTextColor="gray"
                        name="email"
                        value={formData.email}
                        onChangeText={(text) => this.handleInput(text, "email")}
                      />
                    </View>
                    <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, }}
                        placeholder="Mobile Number"
                        placeholderTextColor="gray"
                        name="mobile"
                        value={formData.mobile}
                        onChangeText={(text) => this.handleInput(text, "mobile")}
                      />
                    </View>

                    <View style={{ marginHorizontal: 20, height: 50, backgroundColor: '#E5E5E5', marginTop: 20, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15, }}
                        placeholder="Message"
                        placeholderTextColor="gray"
                        name="message"
                        value={formData.message}
                        onChangeText={(text) => this.handleInput(text, "message")}
                      />
                    </View>

                    <View style={{ borderRadius: 5, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>

                      <View
                        style={{ backgroundColor: '#b62721', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62721' }}>

                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.submitContactDetails()}>

                          <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15,
                            textShadowOffset: { width: 1, height: 1 }
                          }}>SUBMIT</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
function mapStateToProps(state) {
  // //console.log("state Home::::::::::::  ", state);
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(ContactUs);

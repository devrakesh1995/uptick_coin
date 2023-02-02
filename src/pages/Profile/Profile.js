import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
  View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet, SafeAreaView
} from 'react-native';
import { CONST } from '../../_config';

import Screen from '../../components/Screen';

import { GiftedChat } from 'react-native-gifted-chat'

const { height, width } = Dimensions.get('window')

// import PINCode, {
//     hasUserSetPinCode,
//     resetPinCodeInternalStates,
//     deleteUserPinCode,
// } from "@haskkor/react-native-pincode";


class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      otp_code: '',
      submitEnquirySuccess: false,
      formData: {
        "currentpassword": "",
        "newpassword": "",
        "confirmnewpassword": ""
      },
    }
  }

  componentDidMount() {


  }


  updatePasswordSubmit = () => {


    let { formData } = this.state;
    this.props.dispatch(dashboardActions.updatepassword(formData, this.props));


  }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nextProps.dashboard  ", nextProps.dashboard.isUpdated);

    if (nextProps.dashboard.isUpdated) {
      return {
        ...nextProps,
        formData: {
          "currentpassword": "",
          "newpassword": "",
          "confirmnewpassword": ""
        }
      }
    } else {
      return {
        ...nextProps
      }
    }

  }


  handleInput = (text, name) => {
    let { formData } = this.state;
    formData[name] = text;
    this.setState({ formData });
  }



  render() {
    let { formData } = this.state;
    let { dashboard } = this.props;
    let { messageList } = dashboard;


    return (
      <SafeAreaView>
        {/* <ScrollView style={{ backgroundColor: 'black' }}> */}
        <View style={{ width: width, height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ flex: 1, }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#b62721', paddingBottom: 5 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image style={{ width: 28, height: 28, }} source={require('../../Statics/img/Profile/goback.png')} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, }}>Update Password</Text>
            </View>

            <ScrollView>

              <View style={{ alignItems: 'center',  marginVertical: 25}}>
                <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 15, }}>
                  <View style={{ borderRadius: 17, paddingBottom: 15 }}>
                    <View style={{ marginTop: 10, }}>
                      <Text style={{ fontSize: 15, color: '#000', marginHorizontal: 12 }}>Old Password</Text>
                      <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#E5E5E5', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, }}
                          placeholder="Old Password"
                          placeholderTextColor="gray"
                          name="currentpassword"
                          secureTextEntry={true}
                          value={formData.currentpassword}
                          onChangeText={(text) => this.handleInput(text, "currentpassword")}
                        />
                      </View>
                    </View>

                    <View style={{ marginTop: 20, }}>
                      <Text style={{ color: '#000', fontSize: 15, marginHorizontal: 12 }}>New Password</Text>
                      <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#E5E5E5', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, }}
                          placeholder="New Password"
                          placeholderTextColor="gray"
                          name="newpassword"
                          secureTextEntry={true}
                          value={formData.newpassword}
                          onChangeText={(text) => this.handleInput(text, "newpassword")}
                        />
                      </View>
                    </View>

                    <View style={{ marginTop: 20, }}>
                      <Text style={{ color: '#000', fontSize: 15, marginHorizontal: 12 }}>Confirm Password</Text>
                      <View style={{ marginHorizontal: 10, height: 45, backgroundColor: '#E5E5E5', borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, }}
                          placeholder="Confirm Password"
                          placeholderTextColor="gray"
                          name="confirmnewpassword"
                          secureTextEntry={true}
                          value={formData.confirmnewpassword}
                          onChangeText={(text) => this.handleInput(text, "confirmnewpassword")}
                        />
                      </View>
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#b62721', borderRadius: 11, marginHorizontal: 20, marginBottom: 15, marginTop: 40, elevation: 8 }}>
                      <View
                        style={{ backgroundColor: '#b62721', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62721' }}>

                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.updatePasswordSubmit()}>
                          <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: 15, textShadowOffset: { width: 1, height: 1 },
                          }}>Update Password</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
            {/* </KeyboardAvoidingView> */}
          </View>
        </View>

        {/* </ScrollView > */}
      </SafeAreaView>
    );


  }
}


const styles = StyleSheet.create({

  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});



function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
export default connect(mapStateToProps)(Profile);

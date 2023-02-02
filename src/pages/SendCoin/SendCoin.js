import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';

import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, SafeAreaView,
  Image, TouchableOpacity, TextInput, Dimensions
} from 'react-native';
import { scaleRatio, Images } from '../../helpers/index';
import colors from '../../config/colors';
import QRCodeScanner from 'react-native-qrcode-scanner';

const { width, height } = Dimensions.get('window');

class SendCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      address: '',
      amount: '',
      otp_code: '',
      showLogin: true,
      failureMSG: '',
      failureOTPMSG: '',
      showDetails: false,
      showQRScanner: false,
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',
        otp_code: '',

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
  }

  onSuccess = e => {
    this.setState({ showQRScanner: false, address: e.data })
  };

  handleLoginInput = (name, text) => {
    this.setState({ [name]: text })
  }

  onGetOTP = () => {
    let data = {
      username: this.state.email
    }
    this.props.dispatch(userActions.userlogin(data, this.props));
  }

  onSubmitOTP = () => {
    const { users } = this.props;
    const { UserEmailToken } = users;
    if (this.state.otp !== 'NaN') {
      let data = {
        token: UserEmailToken,
        otp: this.state.otp
      }
      this.props.dispatch(userActions.validateOtp(data, this.props));
    }
  }

  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());
    this.props.dispatch(userActions.navigationSave(this.props));
    // this.props.dispatch(dashboardActions.getClientProfile());

    const { navigation } = this.props;

    this._unsubscribe = navigation.addListener('focus', () => {
      let { users } = this.props;

      let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": users ? "Bearer " + users.token : null
      });
      const requestOptions = {
        method: "POST",
        headers: header
      }
      fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.code === 3) {
            this.props.navigation.navigate("Login")
          }
        });
    });

    let { users } = this.props;

    let header = new Headers({
      'Content-Type': 'application/json',
      "Authorization": users ? "Bearer " + users.token : null
    });
    const requestOptions = {
      method: "POST",
      headers: header
    }
    fetch(CONST.BACKEND_URL + `/overView`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.code === 3) {
          this.props.navigation.navigate("Login")
        }
      });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  sendFrom = (e) => {
    let { address, amount } = this.state;
    this.props.dispatch(userActions.sendOtpTX({ address, amount, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }

  sendFromWithOTP = (e) => {
    let { address, amount, otp } = this.state;
    this.props.dispatch(userActions.sendFromWithOTP({ address, amount, otp, comment: "Send" }, this));
    this.setState({ temp: "asdf" })
  }



  handleVerificationInput = (text) => {
    this.setState({ otp: text })
  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { users, dashboard } = this.props;
    let { address, amount } = this.state;
    let { clientProfile } = dashboard;


    // console.log("clientProfileclientProfile",clientProfile);

    return (

      <SafeAreaView >

        <View style={{ width: width, height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ height: '100%' }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#b62721' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 30, }}>
                <Image source={require('../../Statics/img/Profile/goback.png')} style={{ height: 27, width: 27 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, }}>Send  Coin</Text>
            </View>

            {/* <View style={{}}>
              <Text style={{ fontSize: 22, marginTop: 20, paddingLeft: 23, textShadowOffset: { width: 1, height: 1 }, }}>Send</Text>
            </View> */}

            <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 10, marginHorizontal: 19, alignSelf: 'center', marginVertical: 25 }}>
              <View style={{ borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ marginHorizontal: 18, width: '100%', marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, textAlign: 'left', marginTop: 10, marginLeft: 15, textShadowRadius: 1, textShadowColor: 'white' }}>Send Money</Text>
                </View>

                {users && !users.sendCoinTXOTPSuccess ?
                  <>
                    <View style={{ marginHorizontal: 18, width: '100%' }}>
                      <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, textAlign: 'left', marginLeft: 3, textShadowRadius: 1, textShadowColor: 'white' }}>Receiver Address</Text>
                        <TouchableOpacity style={{ backgroundColor: 'white', padding: 5 }} onPress={() => this.setState({ showQRScanner: true })}>
                          <Image style={{ width: 20, height: 20, }} source={require('../../Statics/img/Wallet/qr-code.png')} />
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, backgroundColor: '#E5E5E5', marginTop: 10, borderRadius: 10 }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, }}
                          placeholder="Address"
                          placeholderTextColor="gray"
                          name="address"
                          selectTextOnFocus={true}
                          onChangeText={(text) => this.handleLoginInput("address", text)}
                          value={address}
                        />
                      </View>
                      <View style={{ marginTop: 20, marginLeft: 25 }}>
                        <Text style={{ fontSize: 15 }}>Amount</Text>
                      </View>
                      <View style={{ marginHorizontal: 20, height: 45, marginTop: 10, borderRadius: 10, backgroundColor: '#E5E5E5' }}>
                        <TextInput
                          style={{ marginHorizontal: 10, fontSize: 15, }}
                          placeholder="Amount"
                          placeholderTextColor="gray"
                          name="amount"
                          keyboardType='numeric'
                          onChangeText={(text) => this.handleLoginInput("amount", text)}
                          value={amount}
                        />
                      </View>
                      <View style={{ flexDirection: 'row', marginVertical: 25, alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15 }}>Current Balance,</Text>
                        <Text style={{ marginLeft: 5, fontWeight: '600', fontSize: 15, color: 'gray' }}>{clientProfile && clientProfile.balance ? clientProfile.balance : '0.0'} UPTICK</Text>
                      </View>

                      <View style={{ borderRadius: 11, marginHorizontal: 20, marginBottom: 30, elevation: 8 }}>
                        <View style={{ backgroundColor: '#b62721', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62721' }}>

                          <TouchableOpacity style={{ width: '100%' }}
                            onPress={() => this.sendFrom()}>
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, }}> SEND </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                  :
                  <>
                    <Text style={{ padding: 19, fontSize: 21, fontWeight: 'bold', color: '#b62721', textShadowOffset: { width: 1, height: 1 }, }}>Send Coin Verification</Text>

                    <View style={{ height: 45, width: width - 100, backgroundColor: '#E5E5E5', marginTop: 15, borderRadius: 10 }}>
                      <TextInput
                        style={{ marginHorizontal: 10, fontSize: 15 }}
                        name="otp"
                        placeholder="Enter otp"
                        placeholderTextColor="gray"
                        keyboardType='numeric'
                        onChangeText={(text) => this.handleLoginInput("otp", text)}
                        value={this.state.otp}
                      />
                    </View>
                    <View style={{ width: width - 80, borderRadius: 11, marginHorizontal: 20, marginBottom: 30, marginTop: 40, elevation: 8 }}>
                      <View
                        style={{ backgroundColor: '#b62721', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62721' }}>
                        <TouchableOpacity style={{ width: '100%' }}
                          onPress={() => this.sendFromWithOTP()}>

                          <Text style={{
                            textAlign: 'center',
                            color: '#FFF',
                            fontWeight: 'bold',
                            fontSize: 15,
                            textShadowOffset: { width: 1, height: 1 },

                          }}>VERIFY AND PROCEED</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                }
              </View>
            </View>
          </View>
        </View>
        {this.state.showQRScanner == true ?
          <View style={{ flex: 1, height: height, width: width, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', position: 'absolute' }}>
            <QRCodeScanner
              onRead={this.onSuccess}
              topContent={
                <TouchableOpacity onPress={() => this.setState({ showQRScanner: false })}>
                  <Text style={{ fontSize: 20 }}>Cancel</Text>
                </TouchableOpacity>
              }

            />
          </View> : <View />
        }
      </SafeAreaView>

    )
  }
}




function mapStateToProps(state) {

  const { loggingIn } = state.authentication;
  const { users, dashboard } = state;
  return {
    loggingIn,
    users,
    dashboard
  };
}
const styles = StyleSheet.create({
  screen: {

    backgroundColor: colors.light,
    padding: 6

  },
  itemContainer: {

    marginRight: 16,
    marginLeft: 6
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  }
});
export default connect(mapStateToProps)(SendCoin);

import React, { Component } from 'react';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions, } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, SafeAreaView,
  Image, TouchableOpacity, Dimensions
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';
import QRCode from 'react-native-qrcode-generator'

const { width, height } = Dimensions.get('window');
class ReceiveCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      amount: '',

    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.users.sendCoinSuccess) {
      return {
        ...nextProps,
        address: '',
        amount: '',


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



  async componentDidMount() {

    this.props.dispatch(dashboardActions.getClientProfile());

  }

  copyClipBoard = (text) => {
    Clipboard.setString(text);
    this.props.dispatch(alertActions.success("Copied successfully!"));

  }

  render() {
    let { dashboard } = this.props;
    let { address, amount, } = this.state;
    let { clientProfile } = dashboard;
    let { transaction } = clientProfile ? clientProfile : {};

    // console.log("clientProfileclientProfileclientProfile", clientProfile);

    return (

      <SafeAreaView >

        <View style={{ width: width, height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ height: '100%' }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 4, backgroundColor: '#b62721' }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ width: 30, }}>
                <Image source={require('../../Statics/img/Profile/goback.png')} style={{ height: 27, width: 27 }} />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, }}>Receive Coin</Text>
            </View>


            <View style={{ backgroundColor: '#FFF', width: width - 35, borderRadius: 10, marginHorizontal: 19, elevation: 4, marginVertical: 25 }}>
              <View style={{ borderRadius: 11, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ marginHorizontal: 18, width: '100%', marginBottom: 20 }}>
                  <Text style={{ fontSize: 15, textAlign: 'left', marginTop: 10, marginLeft: 15, textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'white' }}>Address QR Code</Text>
                </View>

                <QRCode
                  value={clientProfile ? clientProfile.address : "NA"}
                  size={180}
                  bgColor='#000'
                  fgColor='#FFF' />

                <View style={{ flexDirection: 'row', marginTop: 20, marginVertical: 20 }}>
                  <Text numberOfLines={1}
                    style={{
                      marginTop: 20,
                      fontSize: scaleRatio(2.1),
                      fontWeight: '600',
                      width: '80%',
                      textAlign: 'center',
                      color: '#000',
                    }}>{clientProfile ? clientProfile.address : "NA"}</Text>
                  {/* <TouchableOpacity onPress={() => this.copyClipBoard(clientProfile ? clientProfile.address : "NA")} >
                    <Image source={require('../../images/copyimg.png')} style={{ height: 20, width: 20, resizeMode: "contain", marginTop: 20 }} />
                  </TouchableOpacity> */}
                </View>

                <View style={{ borderWidth: 1, borderColor: '#b62721', borderRadius: 11, width: width - 80, marginHorizontal: 20, marginBottom: 30, marginTop: 30, elevation: 8 }}>
                  <View
                    style={{ backgroundColor: '#b62721', height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#b62721' }}>
                    <TouchableOpacity style={{ width: '100%' }}
                      onPress={() => this.copyClipBoard(clientProfile ? clientProfile.address : "NA")}>
                      <Text style={{
                        // marginTop: 13,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                        textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'lightgray'

                      }}>Copy</Text>
                    </TouchableOpacity>
                  </View>
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
export default connect(mapStateToProps)(ReceiveCoin);

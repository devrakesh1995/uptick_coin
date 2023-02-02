import React, { Component } from 'react';
import moment from 'moment';
import Clipboard from '@react-native-community/clipboard';
import { connect } from 'react-redux';
import { CONST } from '../../_config';
import { dashboardActions } from '../../_actions';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import {
  StyleSheet, View, Text, ScrollView,
  Image, TouchableOpacity, FlatList, Linking, SafeAreaView, Dimensions, RefreshControl
} from 'react-native';
import { scaleRatio } from '../../helpers/index';
import colors from '../../config/colors';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
const screenWidth = Dimensions.get("window").width;

const { width, height } = Dimensions.get('window');



const data = {
  labels: [1, 2, 3, 4, 5, 6],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2 // optional
    }
  ],
  legend: ["Rainy Days"] // optional
};


const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};



const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

class TransactionHistory extends Component {
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
      refreshing: false
    }
  }


  onRefresh = () => {
    this.setState({ refreshing: true })
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ refreshing: false })

    }, 3000);
    // wait(1000).then(() => refreshing(false));
  };

  static getDerivedStateFromProps(nextProps, prevState) {
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
    this.setState({ showQRScanner: false, address: e.data });
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
    this.props.dispatch(dashboardActions.getPriceHistory())
    this.props.dispatch(userActions.getTransactions());

    this.props.dispatch(userActions.navigationSave(this.props));
    const { navigation } = this.props;

    this._unsubscribe = navigation.addListener('focus', async () => {
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

      this.props.dispatch(userActions.getTransactions());
      this.props.dispatch(dashboardActions.getPriceHistory())
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
    let { dashboard, users } = this.props;
    let { address, amount, failureMSG } = this.state;
    let { clientProfile } = dashboard;
    let { transaction, } = clientProfile ? clientProfile : {};
    let { getPriceHistory } = dashboard;
    let { getTxData } = users;


    return (
      <SafeAreaView>
        <View style={{ width: width, height: '100%', backgroundColor: '#E5E5E5' }}>
          <View style={{ flex: 1 }} >

            <View style={{ height: 50, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', elevation: 8, backgroundColor: '#b62721', paddingBottom: 5 }}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}}>
                <Image style={{ width: 28, height: 28, }} source={require('../../Statics/img/Profile/goback.png')} />
              </TouchableOpacity>
              <Text style={{ fontSize: 19, marginLeft: 10, color: '#FFF', textShadowOffset: { width: 1, height: 1 }, }}>Transaction History</Text>
            </View>

            <View style={{}}>
              <View style={{ width: width - 35, marginHorizontal: 19, height: "56%", marginTop: 25, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center' }}>
                <View style={{ flex: 1, borderTopLeftRadius: 9, borderTopRightRadius: 9, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', }}>

                  <View style={{ flexDirection: 'row', marginHorizontal: 0, marginTop: 40, backgroundColor: '#b62721', height: 40, borderTopLeftRadius: 9, borderTopRightRadius: 9 }}>
                    <View style={{ height: '100%', width: '33%', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>TXID</Text>
                    </View>
                    <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>TYPE</Text>
                    </View>
                    <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 }, }}>TIME(GMT)</Text>
                    </View>
                  </View>


                  <View style={{ borderBottomColor: 'lightgrey', marginBottom: 5 }}>
                    <FlatList
                      data={transaction}
                      keyExtractor={(transaction) => transaction.txid.toString()}
                      numColumns={1}
                      renderItem={({ item, index }) => (

                        <View style={{ flexDirection: 'row', height: 40, borderTopWidth: 1, borderTopColor: 'lightgrey' }}>
                          <View style={{ height: '100%', width: '33%', justifyContent: 'center', alignItems: 'center' }}   >
                            <Text onPress={() => { Linking.openURL('http://172.104.190.31/tx/' + item.txid) }} style={{ fontSize: 12, fontWeight: 'bold', color: '#233446', textShadowOffset: { width: 1, height: 1 }, }}>{item && item.txid ? item.txid.substring(0, 8) + "..." : "XXX"}</Text>
                          </View>

                          <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: item.category == 'send' ? '#b62721' : '#32CD32', textShadowOffset: { width: 1, height: 1 }, }}>{item && item.category ? item.category : ""}</Text>
                          </View>

                          <View style={{ height: '100%', width: '34%', borderLeftColor: 'lightgrey', borderLeftWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{
                              fontSize: 12, color: '#000',
                              fontWeight: 'bold', textShadowOffset: { width: 1, height: 1 },
                            }}>{
                                moment(item.time * 1000).format('YYYY-MM-DD')
                              }</Text>
                          </View>
                        </View>

                      )}
                    />
                  </View>
                </View>
              </View>
            </View>
            {/* </> */}
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
export default connect(mapStateToProps)(TransactionHistory);

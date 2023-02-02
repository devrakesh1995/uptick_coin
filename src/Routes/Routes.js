/*Example of RealM Database in React Native*/
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../pages/Splash';
import initialSelectionscreen from '../pages/initialSelectionscreen';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Forgot from '../pages/Forgot/Forgot';
import BottomTab from './BottomTab';
import Sidebar from './Sidebar';
import Profile from '../pages/Profile/Profile';
import ContactUs from '../pages/ContactUs/ContactUs';
import ReceiveCoin from '../pages/ReceiveCoin/ReceiveCoin';
import SendCoin from '../pages/SendCoin/SendCoin';
import AddressList from '../pages/AddressList/AddressList';

import { dashboardActions } from '../_actions';

import PINCode, {
  hasUserSetPinCode,
} from "@haskkor/react-native-pincode";
import Support from '../pages/Support/Support';
import Chat from '../pages/Chat/Chat';
// import TransactionHistory from '../pages/TransactionHistory/TransactionHistory';

const RouteStack = createStackNavigator();

class Routes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      userData: '',
      isLoading: true,
      showPinLock: false,
      PINCodeStatus: "enter",
    }
  }

  async componentDidMount() {
    this._showEnterPinLock()
    this.props.dispatch(dashboardActions.getClientProfile());

    setTimeout(() => {
      this.setState({ isLoading: false })
    }, 1000);
  }

  _showEnterPinLock = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {
      this.setState({ PINCodeStatus: "enter", showPinLock: true });
    } else {

    }
  };

  _finishProcess = async () => {
    const hasPin = await hasUserSetPinCode();
    if (hasPin) {

      this.setState({ showPinLock: false });
    }
  };

  render() {

    let { users } = this.props;
    let { token } = users;
    let { isLoading } = this.state;

    let isLoggedIn = false;

    if (token) {
      isLoggedIn = true
    }

    return (
      <>{isLoading ?
        <>
          <Splash />
        </>
        :

        <SafeAreaProvider>
          <NavigationContainer>
            {!isLoggedIn ?
              <RouteStack.Navigator headerMode='none' initialRouteName="initialSelectionscreen">
                <RouteStack.Screen name='SelectionScreen' component={initialSelectionscreen} />
                <RouteStack.Screen name="Login" component={Login} />
                <RouteStack.Screen name="Register" component={Register} />
                <RouteStack.Screen name="Forgot" component={Forgot} />
                <RouteStack.Screen name="BottomTab" component={BottomTab} />
                <RouteStack.Screen name="Home" component={Sidebar} />
                <RouteStack.Screen name="Profile" component={Profile} />
                <RouteStack.Screen name="ContactUs" component={ContactUs} />
                <RouteStack.Screen name="Support" component={Support} />
                <RouteStack.Screen name="Chat" component={Chat} />
                {/* <RouteStack.Screen name="TransactionHistory" component={TransactionHistory} /> */}


              </RouteStack.Navigator>
              :
              <RouteStack.Navigator headerMode='none' initialRouteName='Home'>
                <RouteStack.Screen name='SelectionScreen' component={initialSelectionscreen} />
                <RouteStack.Screen name="BottomTab" component={BottomTab} />
                <RouteStack.Screen name="Home" component={Sidebar} />
                <RouteStack.Screen name="Profile" component={Profile} />
                <RouteStack.Screen name="ContactUs" component={ContactUs} />
                <RouteStack.Screen name="Support" component={Support} />
                {/* <RouteStack.Screen name="TransactionHistory" component={TransactionHistory} /> */}
                <RouteStack.Screen name="Chat" component={Chat} />
                <RouteStack.Screen name="SendCoin" component={SendCoin} />
                <RouteStack.Screen name="ReceiveCoin" component={ReceiveCoin} />
                <RouteStack.Screen name="AddressList" component={AddressList} />
                <RouteStack.Screen name="Login" component={Login} />
                <RouteStack.Screen name="Register" component={Register} />
                <RouteStack.Screen name="Forgot" component={Forgot} />
              </RouteStack.Navigator>
            }
          </NavigationContainer>
        </SafeAreaProvider>
      }
        {this.state.showPinLock && (
          <View style={{ height: '100%', width: '100%', backgroundColor: 'white', position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
            <PINCode
              status={this.state.PINCodeStatus}
              touchIDDisabled={true}
              finishProcess={() => this._finishProcess()}
            />
          </View>
        )}
      </>
    );
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
export default connect(mapStateToProps)(Routes);

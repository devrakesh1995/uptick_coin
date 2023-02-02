import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert } from 'react-native';

import Home from '../pages/Home/Home';
import SendCoin from '../pages/SendCoin/SendCoin';
import ReceiveCoin from '../pages/ReceiveCoin/ReceiveCoin';
// import AddressList from '../pages/AddressList/AddressList';
import ContactUs from '../pages/ContactUs/ContactUs';

import PINCode, {
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";


const Tab = createBottomTabNavigator();

const BottomTab = (props) => {
  function handlePick() {
    Alert.alert(
      "Comfirmation!",
      "Are you sure, Do want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("OK Pressed"),
          style: "cancel"
        },
        {
          text: "Yes", onPress: async () => {
            props.navigation.navigate("Login");
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
            await AsyncStorage.removeItem('UserData');
            await deleteUserPinCode();
            await resetPinCodeInternalStates();
          }
        }
      ]
    )
  }
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconLink;
          let Label;

          if (route.name === 'Home') {
            Label = 'Home'
            iconLink = focused
              ? require('../Statics/img/Home/home_white.png')
              : require('../Statics/img/Home/home_gray1.png');

          }

          else if (route.name === 'Receive') {
            Label = 'Receive'
            iconLink = focused
              ? require('../Statics/img/Home/receive_white.png')
              : require('../Statics/img/Home/receive_gray1.png');
          }

          else if (route.name === 'Send') {
            Label = 'Send'
            iconLink = focused
              ? require('../Statics/img/Home/send_white.png')
              : require('../Statics/img/Home/send_gray1.png');
          }

          // else if (route.name === 'Contact') {
          //   Label = 'Contact'
          //   iconLink = focused
          //     ? require('../Statics/img/Home/support_white.png')
          //     : require('../Statics/img/Home/support_gray.png');
          // }

          else if (route.name === 'ContactUs') {
            Label = 'ContactUs'
            iconLink = focused
              ? require('../Statics/img/Home/support_white.png')
              : require('../Statics/img/Home/support_gray.png');
          }

          // You can return any component that you like here!
          return (
            <>
              <Image style={{
                width: 25,
                height: 25,
                margin: 3
              }} source={iconLink} />
            </>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#FFF',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          backgroundColor: '#233446'

        },
      }}

    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Receive" component={ReceiveCoin} />
      <Tab.Screen name="Send" component={SendCoin} />
      {/* <Tab.Screen name="Contact" component={AddressList} /> */}
      <Tab.Screen name="ContactUs" component={ContactUs} />

    </Tab.Navigator>
  );
}

export default (BottomTab);

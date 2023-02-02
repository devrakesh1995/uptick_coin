import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
    DrawerContentScrollView,
} from '@react-navigation/drawer';

export function DrawerContent(props) {
    // console.log("propspropspropsprops  ", props.navigation);
    return (
        <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        width: '100%',
                    }}>

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: '#b62721',
                        height: 160,
                        marginTop: -4,
                        borderColor: '#b62721',
                        borderWidth: 0.5, elevation: 8, borderBottomLeftRadius: 30, borderBottomRightRadius: 30
                    }}>
                        <View style={{ padding: 10, marginLeft: 85, alignSelf: 'center', justifyContent: 'center', borderRadius: 90, backgroundColor: '#fff', }} >
                            <Image style={{ height: 90, width: 90 }} source={require('../Statics/img/Wallet/logo_white.png')} />
                        </View>
                    </View>

                    <View style={{
                        padding: 20,
                    }}>

                        <TouchableOpacity onPress={() => props.navigation.navigate('BottomTab')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20,
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        marginTop: 5, marginLeft: 5,
                                        width: 25,
                                        height: 25,
                                        backgroundColor: ''
                                    }} source={require('../Statics/img/Sidebar/dashboard.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 2
                                    }}>Dashboard</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('TransactionHistory')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        marginTop: 5, marginLeft: 5,
                                        width: 25,
                                        height: 25

                                    }} source={require('../Statics/img/Sidebar/transaction.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 2
                                    }}>Transaction History</Text>
                                </View>

                            </View>
                        </TouchableOpacity> */}

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        marginTop: 5, marginLeft: 5,
                                        width: 25,
                                        height: 25

                                    }} source={require('../Statics/img/Sidebar/contact_us_black.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 2
                                    }}>Contact Us</Text>
                                </View>

                            </View>
                        </TouchableOpacity> */}

                        <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        width: 30,
                                        height: 30

                                    }} source={require('../Statics/img/Sidebar/security.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 5
                                    }}> Security</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('Support')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        width: 30,
                                        height: 30

                                    }} source={require('../Statics/img/Sidebar/support.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 5
                                    }}>Support</Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}


                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('ContactUs')}>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 20
                            }}
                            >
                                <View style={{
                                    width: '10%',
                                }}>
                                    <Image style={{
                                        marginTop: 5, marginLeft: 5,
                                        width: 25,
                                        height: 25

                                    }} source={require('../Statics/img/Sidebar/contact_us_black.png')} />

                                </View>
                                <View style={{
                                    width: '80%',

                                }}>
                                    <Text style={{
                                        color: '#757575',
                                        fontSize: 17,
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        marginLeft: 20,
                                        marginTop: 2
                                    }}>Contact Us</Text>
                                </View>

                            </View>
                        </TouchableOpacity> */}

                    </View>


                    <TouchableOpacity style={{
                        marginTop: -20
                    }}
                        onPress={() => props.navigation.navigate('SelectionScreen')}>
                        <View style={{
                            height: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                marginLeft: 20

                            }}>
                                <Image style={{
                                    width: 30,
                                    height: 30

                                }} source={require('../Statics/img/Sidebar/logout_black.png')} />

                            </View>
                            <View style={{
                                width: '50%'

                            }}>
                                <Text style={{
                                    color: '#757575',
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                    marginLeft: 15
                                }}>Logout</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}

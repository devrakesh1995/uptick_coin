import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions, dashboardActions } from '../../_actions';
import {
    View, Text, Dimensions, Image, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView
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


class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            issuesDetails: '',

            behavior: 'position',

            messages: '',
            formData: {
                name: "",

            }
        }
    }

    componentDidMount() {
        console.log('lllllllllllllllll  ', this.props.route.params.ticket);
        let tempData = {
            ticketId: this.props.route.params.ticket.id
        }
        this.props.dispatch(dashboardActions.getMessagesByTicketId(tempData))
        // console.log("asddddddasdf:::::::::::::::::");

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.dashboard.messageCreate) {
            return {
                ...nextProps,
                formData: {
                    name: "",
                }
            }
        } else {
            return {
                ...nextProps
            }
        }

    }
    handleInput = (text, name) => {

        // console.log("abc::::::::::::", name);
        // console.log("abc::::::::::::", text);
        let { formData } = this.state;
        formData[name] = text;
        this.setState({ formData });
    }

    sendMessage = () => {
        let ticketId = this.props.route.params.ticket && this.props.route.params && this.props.route.params.ticket.id ? this.props.route.params.ticket.id : null;

        if (ticketId) {

            let { formData } = this.state;

            let reqData = {
                "ticketId": ticketId,
                "text": formData.name
            }
            this.props.dispatch(dashboardActions.createMessage(reqData, this.props));
        }


    }

    messageInput = (text) => {
        this.setState({ messages: text })
    }







    render() {
        let { formData } = this.state;
        let { dashboard } = this.props;
        let { messageList } = dashboard;
        console.log("messageList   ", messageList);


        return (

            <View style={{ width: width, backgroundColor: '#f1f1f1', borderWidth: 3, height: height - 6, borderColor: '#131313' }}>

                <View style={{ flex: 1, borderWidth: 3, borderColor: '#C79323', }} >

                    <View style={{ marginBottom: 16 }}>
                        <View style={{ marginHorizontal: 18, flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => this.props.navigation.goBack()}>
                                <Image style={{
                                    width: 30,
                                    height: 30,
                                    height: 30,
                                    marginTop: 20
                                }} source={require('../../Statics/img/Profile/back-arrow.png')} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20, textAlign: 'center', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 1, textShadowColor: 'lightgray' }}>CHAT HERE</Text>
                        </View>
                    </View>





                    <ScrollView>
                        <View style={{ height: "80%" }}>
                            {
                                messageList && messageList.length > 0 ?

                                    messageList.map((element, index) => (
                                        <>
                                            {
                                                index % 2 == 0 ? <View style={{}}>
                                                    <View style={{ justifyContent: 'flex-end', marginRight: 5, }}>
                                                        <Text style={{ alignSelf: 'flex-end', fontSize: 14, padding: 10, backgroundColor: '#c7e398', borderRadius: 10, }}>{element.text}</Text>
                                                    </View>
                                                </View> : <View style={{}}>
                                                    <View style={{ justifyContent: "flex-start", marginLeft: 5 }}>
                                                        <Text style={{ alignSelf: 'flex-start', fontSize: 14, padding: 10, backgroundColor: 'white', borderRadius: 10, }}>{element.text}</Text>
                                                    </View>
                                                </View>
                                            }

                                        </>

                                    ))
                                    :
                                    <View style={{ justifyContent: "flex-start", }}>
                                        <View style={{ height: 50, justifyContent: "flex-start", }}>
                                            <Text style={{}}></Text>
                                        </View>
                                    </View>
                            }






                        </View>






                    </ScrollView>




                    <KeyboardAvoidingView behavior={this.state.behavior}>
                        <View style={{ width: '100%', height: 50, justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>


                            <TextInput
                                placeholder={'Type a Message'}
                                style={{ width: '85%', paddingLeft: 10, backgroundColor: 'white' }}
                                name="name"
                                secureTextEntry={false}
                                value={formData.name}
                                onChangeText={(text) => this.handleInput(text, "name")}
                            >

                            </TextInput>
                            <TouchableOpacity style={{ height: 50, width: "15%", backgroundColor: 'white' }}
                                onPress={() => { this.sendMessage() }}
                            >
                                <Image source={require('../../Statics/img/Restimage/send.png')} style={{ alignSelf: 'center', marginTop: 10, height: 35, width: 35 }} />
                            </TouchableOpacity>


                        </View>
                    </KeyboardAvoidingView>


                </View >

            </View >

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
export default connect(mapStateToProps)(Chat);

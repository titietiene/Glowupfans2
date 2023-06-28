import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { CardLayout, Heading, InputField, LabelText, ActionButton, ErrorMessage } from '../Atoms';
import Separator from '../Atoms/Separator';
import { navigate, navReset } from '../utils/navigationRef';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { API } from '../services/api';
import { storeData } from '../utils';
import { storageConstants } from '../constants';
import { useSignInValidator } from '../utils/userFormValidator';

WebBrowser.maybeCompleteAuthSession();
const SignIn = () => {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [googleLogin, setGoogleLogin] = useState(false);
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });
    const [errorBag, setErrorBag] = useState({
        email: '',
        password: ''
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "459682868428-6jonn2n1s5ml83hn0acrl1rl0ohe6hdl.apps.googleusercontent.com",
        webClientId: "459682868428-fa0ecn9281edamqobior7528b5rlgcqq.apps.googleusercontent.com",
        iosClientId: "459682868428-qrrveiv4jig2eeidovfc9e13t0vmquce.apps.googleusercontent.com"
    });

    useEffect(() => {
        if (response?.type === "success") {
            setToken(response.authentication.accessToken);
            getUserInfo(response.authentication.accessToken);
        } else {
            setGoogleLogin(false);
        }
    }, [response, token]);

    const getUserInfo = async (myToken) => {
        console.log(myToken, 'myToken');
        try {
            const response = await API.post('auth/google', JSON.stringify({ "access_token": myToken }));
            if (response.data) {
                console.log(response.data, 'response');
                setGoogleLogin(false);
                storeData(storageConstants.PROFILE_DATA, JSON.stringify(response.data));
                storeData(storageConstants.ACCESS_TOKEN, response.data.token);
                navReset('DrawerApp');
            } else {
                setGoogleLogin(false);
            }
            // const response = await fetch(
            //     "https://www.googleapis.com/userinfo/v2/me",
            //     {
            //         headers: { Authorization: `Bearer ${myToken}` },
            //     }
            // );

            // const user = await response.json();
            // console.log(user, 'user');
            // setUserInfo(user);
        } catch (error) {
            setGoogleLogin(false);
            console.log(error, 'gooogle error');
            // Add your own error handler here
        }
    };

    const handleLogin = () => {
        setLoading(true);
        const validatedData = useSignInValidator(userLogin);
        if (!validatedData.flag) {
            setErrors(validatedData)
            setLoading(false)
            return
        }
        resetErrorBag()
        API.post('login', JSON.stringify(userLogin)).then(res => {
            storeData(storageConstants.PROFILE_DATA, JSON.stringify(res.data));
            storeData(storageConstants.ACCESS_TOKEN, res.data.token);
            setLoading(false);
            navReset('DrawerApp');
        }
        ).catch(err => {
            console.log(err);
            setLoading(false);
        })

    }

    function resetErrorBag() {
        setErrorBag({
            email: '',
            password: ''
        })
    }


    function setErrors(validatedData) {
        setErrorBag(validatedData)
    }

    function handleInputChange(name, value) {
        console.log(name, value);
        setUserLogin({
            ...userLogin,
            [name]: value
        })
        setErrorBag({ ...errorBag, [name]: '' })
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#f4e2b7'

            }}
        >
            <CardLayout>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    // className='flex flex-col items-center h-full w-full relative'
                    >
                        <Heading>Sign In</Heading>
                        <InputField
                            onChangeText={(value) => handleInputChange('email', value)}
                            name='email'
                            placeholder='Email address' />
                        <ErrorMessage error={errorBag?.email} />
                        <InputField
                            inputType={'password'}
                            onChangeText={(value) => handleInputChange('password', value)}
                            name='password'
                            placeholder='Password' />
                        <ErrorMessage error={errorBag?.password} />
                        <LabelText styles={{ width: '80%' }}>Forgot Password?</LabelText>
                        <ActionButton
                            disabled={loading}
                            onPress={handleLogin}
                            customStyles={{ backgroundColor: '#ffc300' }}>
                            {
                                loading ?
                                    <ActivityIndicator size="small" color="#ffffff" />
                                    :
                                    <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Sign In</Text>
                            }
                        </ActionButton>
                        <Separator />
                        <ActionButton
                            disabled={googleLogin}
                            onPress={() => {
                                setGoogleLogin(true);
                                promptAsync();
                            }}
                            customStyles={{ backgroundColor: '#ee7271', height: 50, marginTop: 0 }}>
                            {
                                googleLogin ?
                                    <ActivityIndicator size="small" color="#ffffff" />
                                    :
                                    <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Google</Text>
                            }
                        </ActionButton>
                        <ActionButton customStyles={{ backgroundColor: '#3b5998', height: 50, marginTop: 20 }}>
                            <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Facebook</Text>
                        </ActionButton>
                        <ActionButton customStyles={{ backgroundColor: '#000000', height: 50, marginTop: 20 }}>
                            <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Apple</Text>
                        </ActionButton>
                        <View
                            onTouchStart={() => navigate("SignUp")}
                            style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}>
                            <LabelText styles={{ color: '#000' }}>New to us?
                            </LabelText>
                            <LabelText style={{ color: '#ffc300', fontFamily: 'RCBold' }}>Sign up here</LabelText>
                        </View>
                    </View>
                </ScrollView>
            </CardLayout>
        </View>
    )
}

export default SignIn;
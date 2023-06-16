import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Heading, InputField, LabelText, ActionButton, CardLayout, ErrorMessage } from '../Atoms';
import Separator from '../Atoms/Separator';
import { storageConstants } from '../constants';
import { API } from '../services/api';
import { storeData } from '../utils';
import { navigate } from '../utils/navigationRef';
import { useSignUpValidator } from '../utils/userFormValidator';

const SignUp = () => {
    const [userSignup, setUserSignup] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorBag, setErrorBag] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const resetErrorBag = () => {
        setErrorBag({
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        })
    }

    const handleSignup = async () => {
        setLoading(true);
        const validatedData = useSignUpValidator(userSignup);
        if (!validatedData.flag) {
            setErrorBag(validatedData)
            setLoading(false)
            return
        }
        resetErrorBag()
        console.log(userSignup);
        try {
            let response = await API.post('register', JSON.stringify(
                userSignup
            ))


            await storeData(storageConstants.ACCESS_TOKEN, response.data?.token)
            await storeData(storageConstants.PROFILE_DATA, JSON.stringify(response.data))
            console.log(response.data);
            setLoading(false);
            navigate('Interests', { userSignup })
        }
        catch (e) {
            console.log(e, 'error');
            setLoading(false);
        }
        // navigate("Interests", { userSignup })
    }

    function handleInputChange(name, value) {
        setLoading(false)
        setUserSignup({
            ...userSignup,
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
                        <Heading>Sign Up</Heading>
                        <InputField placeholder='Username'
                            onChangeText={text => handleInputChange('name', text)}
                        />
                        <ErrorMessage error={errorBag?.name} />
                        {/* <InputField placeholder='Name' 
                        onChangeText={text => setUserSignup({...userSignup, email: text})}
                        /> */}
                        <InputField placeholder='Email address'
                            onChangeText={text => handleInputChange('email', text)}
                        />
                        <ErrorMessage error={errorBag?.email} />
                        <InputField placeholder='Password'
                            inputType={'password'}
                            onChangeText={text => handleInputChange('password', text)}
                        />
                        <ErrorMessage error={errorBag?.password} />
                        <InputField placeholder='Confirm password'
                            inputType={'password'}
                            onChangeText={text => handleInputChange('password_confirmation', text)}
                        />
                        <ErrorMessage error={errorBag?.password_confirmation} />
                        <ActionButton
                            onPress={handleSignup}
                            disabled={loading}
                            customStyles={{ backgroundColor: '#ffc300' }}>
                            {
                                loading ?
                                    <ActivityIndicator size="small" color="#ffffff" />
                                    :
                                    <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Sign Up</Text>
                            }
                        </ActionButton>
                        <Separator />
                        <ActionButton customStyles={{ backgroundColor: '#ee7271', height: 50, marginTop: 0 }}>
                            <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Google</Text>
                        </ActionButton>
                        <ActionButton customStyles={{ backgroundColor: '#3b5998', height: 50, marginTop: 20 }}>
                            <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Facebook</Text>
                        </ActionButton>
                        <ActionButton customStyles={{ backgroundColor: '#000000', height: 50, marginTop: 20 }}>
                            <Text style={{ color: '#ffffff', fontFamily: 'RCRegular', fontSize: 18 }}>Connect with Apple</Text>
                        </ActionButton>
                        <View
                            onTouchStart={() => alert('Sign up here')}
                            style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}>
                            <LabelText styles={{ color: '#000' }}>Already have account?
                            </LabelText>
                            <LabelText style={{ color: '#ffc300', fontFamily: 'RCBold' }}>Login</LabelText>
                        </View>
                    </View>
                </ScrollView>
            </CardLayout>
        </View>

    )
}

export default SignUp;
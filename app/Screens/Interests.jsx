import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import { ActionButton, LabelText } from '../Atoms';
import { storageConstants } from '../constants';
import { API } from '../services/api';
import { navigate, storeData } from '../utils';

const Interests = ({ route }) => {
    const [loading, setLoading] = useState(false);
    const [interests, setInterests] = useState([
        {
            "id": 1,
            "name": "Nails",
            "image": "/categories/1681892736882.jpg"
        },
        {
            "id": 2,
            "name": "Hair",
            "image": "/categories/1681892637173.jpeg"
        },
        {
            "id": 3,
            "name": "Wellness",
            "image": "/categories/1681431707753.jpg"
        },
        {
            "id": 4,
            "name": "Skincare",
            "image": "/categories/1685206241140.jpeg"
        },
        {
            "id": 6,
            "name": "Makeup",
            "image": "/categories/1681431643708.jpg"
        },
        {
            "id": 10,
            "name": "Braids",
            "image": "/categories/1681892504846.jpg"
        },
        {
            "id": 11,
            "name": "Melanin",
            "image": "/categories/1681892661430.jpg"
        },
        {
            "id": 12,
            "name": "Mental health Support",
            "image": "/categories/1681892849816.png"
        },
        {
            "id": 13,
            "name": "General creators",
            "image": "/categories/1681892552577.jpg"
        },
        {
            "id": 16,
            "name": "Organic products",
            "image": "/categories/1681431746511.jpg"
        },
        {
            "id": 17,
            "name": "Eyelashes",
            "image": "/categories/1683692738970.jpeg"
        }
    ]);
    const [selectedInterests, setSelectedInterests] = useState([]);

    useEffect(() => {
        // get interests from api
        API.get('categories').then(response => {
            console.log(response.data.data);
            setInterests(response.data.data);
        }).catch(e => {
            console.log(e);
        })
    }, [])


    const handleInterestSelection = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter(item => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    }

    const handleContinue = async () => {
        // get id of selected interests
        setLoading(true);
        if (selectedInterests.length < 3) {
            alert('Please select at least three interest');
            setLoading(false);
            return;
        }
        let selectedInterestsIds = selectedInterests.map(item => item.id);
        console.log({
            "subs_category_id": selectedInterestsIds
        });
        try {
            let response = await API.post('attach_categories', JSON.stringify({
                "category_ids": selectedInterestsIds
            }))


            // await storeData(storageConstants.ACCESS_TOKEN, response.data?.token)
            // await storeData(storageConstants.PROFILE_DATA, JSON.stringify(response.data))
            console.log(response.data);
            setLoading(false);
            navigate('DrawerApp')
        }
        catch (e) {
            console.log(e);
            setLoading(false);
        }

    }

    return (
        <View
            className='flex flex-col items-center h-full w-full relative p-10 bg-white'
        >
            <LabelText styles={{ width: '100%', color: '#000' }}>Help us build your feed, tell us about your interests</LabelText>

            <FlatList
                style={{
                    width: '100%',
                    marginTop: 20
                }}
                data={interests}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => handleInterestSelection(item)}
                        style={{
                            width: '45%',
                            height: 100,
                            borderColor: selectedInterests.includes(item) ? '#ffc300' : '#FFF',
                            borderWidth: selectedInterests.includes(item) ? 2 : 0,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 6,
                            elevation: 1,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                        }}
                    >
                        <Image
                            source={{ uri: `https://firebasestorage.googleapis.com/v0/b/glowupfans.appspot.com/o/categories%2F${item.image}?alt=media&token=cf286ee3-69c0-49e6-8286-0277ef32c560` }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                            }}
                        />
                        <Text
                            style={{
                                position: 'absolute',
                                backgroundColor: '#FFF',
                                color: '#000',
                                padding: 5,
                                fontFamily: 'RCRegular',
                                fontSize: 16,
                            }}
                        >{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
            <ActionButton
                customStyles={{
                    backgroundColor: '#ffc300',
                    width: '100%',
                    marginTop: 20,
                }}
                activeOpacity={0.8}
                onPress={handleContinue}
            >
                {
                    loading ? <ActivityIndicator color='#FFF' /> :
                        <Text style={{ color: '#FFF', fontFamily: 'RCRegular', fontSize: 18 }}>Continue</Text>
                }

            </ActionButton>

        </View>
    );
}

export default Interests;

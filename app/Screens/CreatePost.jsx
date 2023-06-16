import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ActionButton, ErrorMessage, InputField } from '../Atoms';
import * as DocumentPicker from 'expo-document-picker';
import SelectDropdown from 'react-native-select-dropdown'

const CreatePost = () => {
    const [fileName, setFileName] = React.useState('')
    const [postContent, setPostContent] = React.useState({
        text_content: '',
        category_id: 0,
        media_content: ''
    })
    const [errorBag, setErrorBag] = React.useState({
        text_content: '',
        category_id: '',
        media_content: ''
    })
    const [loading, setLoading] = React.useState(false)

    const [interests, setInterests] = React.useState([
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
    const [blobFile, setBlobFile] = React.useState(null)

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'video/*',
            copyToCacheDirectory: true,
            multiple: false
        })
        if (result != null) {
            console.log(result, 'result')
            if (result.size > 2900000) {
                alert('File size should be less than 3MB')
                return
            }
            const r = await fetch(result.uri);
            const b = await r.blob();
            setFileName(result.name)
            setBlobFile(b)
            //setIsChoosed(true) 
        }
    }

    const resetErrorBag = () => {
        setErrorBag({
            text_content: '',
            category_id: '',
            media_content: ''
        })
    }

    const createPostHanler = async (contentName) => {

        try {
            const response = await API.post('create_videofeed', JSON.stringify({
                text_content: postContent.text_content,
                category_id: postContent.category_id,
                media_content: contentName
            }))
            setLoading(false)
            navReset('DrawerApp')
            console.log(response.data, 'response')
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }

    }
    // { ...postContent, category_id: text }

    return (
        <View style={{ flex: 1, padding: 10, alignItems: 'center' }} >
            <InputField
                placeholder="Title"
                placeholderTextColor="#000"
                onChangeText={(text) => setPostContent({ ...postContent, text_content: text })}
            />
            <ErrorMessage error={errorBag.text_content} />
            <SelectDropdown
                data={interests}
                buttonStyle={atomicStyles.inputTextBox}
                // defaultValue={'Select a ' }
                defaultButtonText={"Select category of video"}
                buttonTextStyle={{ color: '#000', textAlign: 'left', fontFamily: 'RCRegular', fontSize: 16 }}
                onSelect={(selectedItem, index) => {
                    setPostContent({ ...postContent, category_id: selectedItem.id })
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name
                }}
                rowTextForSelection={(item, index) => {
                    return item.name
                }}
            />
            <ErrorMessage error={errorBag.category_id} />
            <ActionButton
                customStyles={{ width: '80%', marginTop: 20, backgroundColor: '#000' }}
                onPress={() => pickDocument()}
            >
                <Text style={{ color: '#fff' }}>Choose File</Text>
            </ActionButton>
            <ErrorMessage error={errorBag.media_content} />
            <Text>{fileName}</Text>

            <ActionButton
                customStyles={{ width: '80%', marginTop: 40 }}
                onPress={() => {
                    setLoading(true)
                    const validatedData = useCreatePostValidator(postContent);
                    console.log(validatedData, 'validatedData',!validatedData.flag)
                    if (!validatedData.flag) {
                        setErrorBag(validatedData)
                        setLoading(false)
                        return
                    }
                    resetErrorBag()
                    UploadFile(blobFile, fileName, (isUploadCompleted) => {
                        if (isUploadCompleted) {
                            createPostHanler(fileName)
                        } else {
                            setLoading(false)
                        }
                    })
                }
                }
            >
                {
                    loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'RCRegular' }}>Create Post</Text>
                }
            </ActionButton>
        </View >
    )
}

export default CreatePost;



import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../firebaseConfig';
import { async } from '@firebase/util';
import { API } from '../services/api';
import atomicStyles from '../Atoms/atomicStyles';
import { useCreatePostValidator } from '../utils/userFormValidator';
import { navReset } from '../utils';

const UploadFile = (blobFile, fileName, isUploadCompleted) => {
    if (!blobFile) return;
    const sotrageRef = ref(storage, `video-feeds/${fileName}`); //LINE A
    const uploadTask = uploadBytesResumable(sotrageRef, blobFile); //LINE B
    uploadTask.on(
        "state_changed", null,
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { //LINE C
                console.log("File available at", downloadURL);
                isUploadCompleted(true)
                return downloadURL
            });
        }
    );
}
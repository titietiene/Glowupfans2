import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true;
    }
    catch (e) {
        return false;
    }
};

const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value;
    }
    catch (e) {
        return null;
    }
}

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
        return true;
    }
    catch (e) {
        return false;
    }
}

const multiremove=async(keys)=>{
    try{
        await AsyncStorage.multiRemove(keys)
        return true;
    }
    catch(e){
        return false;
    }
}

export { storeData, getData, removeData, multiremove };
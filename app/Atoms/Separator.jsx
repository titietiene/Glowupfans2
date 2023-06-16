import React from 'react';
import { View, Text } from 'react-native';

const Separator = () => {
    return (
        <View className='flex flex-row items-center justify-center px-16 py-4 gap-4'>
            <View className='h-[1px] w-[40%] bg-[#0000005A]'></View>
            <Text style={{ fontFamily: 'RCRegular', fontSize: 18 }}>OR</Text>
            <View className='h-[1px] w-[40%] bg-[#0000005A]'></View>
        </View>
    )
}

export default Separator;
import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Feed from '../Screens/Feed';
import CreatePost from '../Screens/CreatePost';
import { logoutClean } from '../services/api';
import { navReset } from '../utils';

const Drawer = createDrawerNavigator();

export default function DrawerApp() {
    return (
        // <NavigationContainer>
        <Drawer.Navigator initialRouteName="Feed"
            drawerContent={props => {
                return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        <DrawerItem label="Logout" onPress={() => {
                            logoutClean().then(() => {
                                navReset('SignIn')
                            })
                        }} />
                    </DrawerContentScrollView>
                )
            }}
        >
            <Drawer.Screen options={{ headerShown: false }} name="Feed" component={Feed} />
            <Drawer.Screen name="Create Post" component={CreatePost} />
        </Drawer.Navigator>
        // </NavigationContainer>
    );
}

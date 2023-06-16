import { useFonts } from 'expo-font';
import { SafeAreaView, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import SignIn from './app/Screens/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './app/Screens/SignUp';
import { setNavigator } from './app/utils/navigationRef';
import Interests from './app/Screens/Interests';
import Feed from './app/Screens/Feed';
import { getData } from './app/utils';
import { storageConstants } from './app/constants';
import CreatePost from './app/Screens/CreatePost';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerApp from './app/routes/Drawer';

const Drawer = createDrawerNavigator();


SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
//password_confirmation
export default function App() {
  const [fontsLoaded] = useFonts({
    'RCRegular': require('./assets/fonts/RCRegular.ttf'),
    'RCBold': require('./assets/fonts/RCBold.ttf'),
    'RCLight': require('./assets/fonts/RCLight.ttf'),
  });

  const [initialState, setInitialState] = useState({
    routes: [{ name: 'SignIn' }],
  });

  useEffect(() => {
    getData(storageConstants.ACCESS_TOKEN).then((res) => {
      console.log(res);
      setInitialState(res ? { routes: [{ name: 'DrawerApp' }] } : { routes: [{ name: 'SignIn' }] });
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      if (initialState) {
        await SplashScreen.hideAsync();
      }

    }
  }, [fontsLoaded, initialState]);

  if (!fontsLoaded) {
    return null;
  }




  return (
    <NavigationContainer
      initialState={initialState}
      ref={(navigator) => {
        setNavigator(navigator);
      }}
      onReady={onLayoutRootView}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name="Interests" component={Interests} />
        <Stack.Screen options={{ headerShown: false }} name="DrawerApp" component={DrawerApp} />
        {/* <Stack.Screen options={{ headerShown: false }} name="Feed" component={Feed} />
        <Stack.Screen name="Create Post" component={CreatePost} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


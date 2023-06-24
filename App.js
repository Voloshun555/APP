
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import  LoginScreen  from "./Screens/LoginScreen/LoginScreen.jsx";
import * as font from "expo-font";

const fonts = () => FontFace.loadAsync({
  'rm-medium': require('./fonts/Roboto-Medium.ttf'),
  'rm-regular': require('./fonts/Roboto-Regular.ttf')
})

const MainStack = createStackNavigator();

export default function App(   ) {
  return (

    <NavigationContainer>
    <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
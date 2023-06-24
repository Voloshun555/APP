
import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import  LoginScreen  from "./Screens/LoginScreen/LoginScreen.jsx";
import { useFonts } from 'expo-font'; 

const MainStack = createStackNavigator();

export default function App(   ) {
  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./fonts/Roboto-Medium.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
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
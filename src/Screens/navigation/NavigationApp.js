import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../LoginScreen/LoginScreen.jsx";
import { Home } from "../home";
import { Comments } from "../pageComponent/Сomments.jsx";
import { MapScrean } from "../pageComponent/MapScrean.jsx";

const MainStack = createStackNavigator();

export function NavigationApp() {
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
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <MainStack.Screen name="Comments" component={Comments} />
        <MainStack.Screen name="MapScrean" component={MapScrean} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

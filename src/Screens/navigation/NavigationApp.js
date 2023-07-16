import RegistrationScreen from "../RegistrationScreen/RegistrationScreen";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../LoginScreen/LoginScreen.jsx";
import { Home } from "../home";
import { Comments } from "../pageComponent/Сomments.jsx";
import { MapScrean } from "../pageComponent/MapScrean.jsx";


const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

export function NavigationApp(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />

        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Comments" component={Comments} />
      <HomeStack.Screen name="MapScrean" component={MapScrean} />
    </HomeStack.Navigator>
  );
}

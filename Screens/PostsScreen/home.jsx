import { View,Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();
export const Home = () => {
    
    const navigation = useNavigation();
    return (
<Tabs.Navigator
  sscreenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === "Profile") {
        iconName = focused
          ? "ios-information-circle"
          : "ios-information-circle-outline";
      } else if (route.name === "Settings") {
        iconName = focused ? "ios-list-box" : "ios-list";
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: "tomato",
    inactiveTintColor: "gray",
  }}>
 <Tabs.Screen name="Публікації" />
</Tabs.Navigator>
    )
}
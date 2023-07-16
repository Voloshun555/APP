import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feather, Ionicons } from "@expo/vector-icons";
import { NewPublication } from "./PostsScreen/newPublication";
import { CreatePostsScreen } from "./PostsScreen/CreatePostsScreen";
import { ProfileScreen } from "./PostsScreen/ProfileScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";
import { TouchableOpacity } from "react-native";

const Tabs = createBottomTabNavigator();
export const Home = () => {

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <Tabs.Navigator
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => {
          if (
            route.name === "Створити публікацію" ||
            route.name === "Профіль"
          ) {
            return (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#212121"
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              />
            );
          }
        },
        headerRight: () => {
          if (route.name === "Публікації" || route.name === "Профіль") {
            return (
              <TouchableOpacity onPress={signOut}>
                <Feather
                  name="log-out"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 21 }}
                />
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Публікації") {
            iconName = focused ? "grid-outline" : "grid-outline";
          } else if (route.name === "Створити публікацію") {
            iconName = focused ? "ios-add-sharp" : "ios-add-sharp";
          } else if (route.name === "Профіль") {
            iconName = focused ? "person-outline" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 25,
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 25,
          marginRight: 25,
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FFFFFF",
        activeBackgroundColor: "#FF6C00",
      }}>
      <Tabs.Screen name="Публікації" component={NewPublication} />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tabs.Navigator>
  );
};

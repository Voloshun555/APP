import React from "react";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import { NavigationApp } from "./src/Screens/navigation/NavigationApp";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./fonts/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}>
        <NavigationApp />
      </PersistGate>
    </Provider>
  );
}

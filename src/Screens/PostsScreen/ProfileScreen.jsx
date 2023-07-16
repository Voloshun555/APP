import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button,
  Platform,
  Image,
} from "react-native";
import React from "react";
import SvgAdd from "../../image/svgAdd";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
export function ProfileScreen({ navigation }) {
  const { login } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      style={styles.Avoiding}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.backImage}
            source={require("../ImageBackground/PhotoBG.png")}>
            <View style={styles.containerForm}>
              <View style={styles.avatarImg}>
                <View style={styles.avatar}></View>
                <View>
                  <SvgAdd style={styles.addSvg}></SvgAdd>
                  <Feather
                    name="log-out"
                    size={24}
                    color="#BDBDBD"
                    style={styles.logAut}
                    onPress={signOut}
                  />
                </View>
              </View>
              <View style={styles.userNameContainer}>
                <Text style={styles.userText}>{login}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  Avoiding: {
    flex: 1,
  },
  logAut: {
    position: "absolute",
    transform: [{ translateX: 220 }, { translateY: -40 }],
  },
  addSvg: {
    width: 25,
    height: 25,
    position: "absolute",
    top: "10%",

    transform: [{ translateX: 107 }, { translateY: -40 }],
  },

  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImg: {
    position: "relative",
    transform: [{ translateX: 0 }, { translateY: -60 }],
  },
  containerForm: {
    alignItems: "center",
    width: "100%",
    height: "60%",

    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  backImage: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    width: " 100%",
    justifyContent: "center",
    alignItems: "center",
  },
  userNameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userText: {
    color: "#212121",
    fontSize: 30,
  },
});

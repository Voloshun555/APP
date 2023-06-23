import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [displayText, setDisplaytext] = useState("Показати");
  useEffect(() => {
    setDisplaytext(showPassword ? "Показати" : "Приховати");
  }, [displayText, showPassword]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Formik>
      <View style={styles.form}>
        <TextInput
          name="email"
          style={[
            styles.input,
            focusEmail ? styles.inputOnFocus : styles.inputOnBlur,
          ]}
          onFocus={() => setFocusEmail(true)}
          onBlur={() => setFocusEmail(false)}
          placeholder="Адреса електронної пошти"
        />
        <View style={styles.password_wrp}>
          <TextInput
            name="password"
            style={[
              styles.input,
              focusPassword ? styles.inputOnFocus : styles.inputOnBlur,
            ]}
            onFocus={() => setFocusPassword(true)}
            onBlur={() => setFocusPassword(false)}
            placeholder="Пароль"
            secureTextEntry={showPassword}
          />
          <TouchableOpacity
            style={styles.passwordShow}
            onPress={handleTogglePassword}>
            <Text>{displayText}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.button_title}> Логін</Text>
        </TouchableOpacity>
        
      </View>
    </Formik>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
    marginTop: 16,
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
    cursor: "pointer",
  },

  input: {
    padding: 16,
    borderRadius: 8,
    borderColor: "#e8e8e8",
    height: 50,
    borderWidth: 1,
    width: "100%",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
  },
  
  button_title: {
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },

  passwordShow: {
    position: "absolute",
    right: 60,
    transform: [{ translateX: 50 }, { translateY: 17 }],
  },
  inputOnFocus: { borderColor: "#FF6C00" },
  inputOnBlur: { borderColor: "#e8e8e8" },
});

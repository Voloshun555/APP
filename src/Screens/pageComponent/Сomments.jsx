import { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function Comments({ route }) {
  const [textInput, setTextInput] = useState("");
  const [Massege, setMassege] = useState([]);

  const addMassege = () => {
    setMassege([...Massege, textInput]);
    setTextInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={{ uri: route.params.location }}
          style={{ flex: 1, width: "100%", height: "100%" }}
        />
      </View>

      <FlatList
        data={Massege}
      
        renderItem={({ item }) => (
          <View style={[styles.commentBlock]}>
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item}</Text>
            </View>
          </View>
        )}
      />
      
      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setTextInput(value)}
          value={textInput}
          textAlign={"left"}
          placeholderTextColor={"#bdbdbd"}
          placeholder="To comment..."
        />
        <TouchableOpacity style={styles.commentBtn} onPress={addMassege}>
          <AntDesign name="arrowup" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  image: {
    marginTop: 32,
    width: "100%",
    height: 240,
    resizeMode: "contain",
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  commentBlock: {
    marginTop:10,
  },
  commentBlockUser: {
    flexDirection: "row-reverse",
  },
  commentBlockFol: {},
 
  comment: {
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    borderRadius: 6,
    width: 320,
  },

  commentText: {
    fontSize: 16,
    marginBottom: 4,
  },
  // commentDate: {
  //   alignSelf: "flex-end",
  //   color: "#a9a9a9",
  // },
  inputBlock: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 28,
    height: 50,
    width: "100%",
    backgroundColor: "#f6f6f6",
    padding: 16,
  },
  commentBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 5,
  },
});

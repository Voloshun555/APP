import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View, Image, FlatList, TextInput,TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export function Comments({ route }) {
  const [text, setText] = useState(null);

  console.log(route.params.location);

  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: route.params.location }} style={styles.photo} />
      </View>
      <View  style={styles.inputContainer}>
        <TextInput
          placeholder="Коментувати..."
          style={styles.input}
          value={text}
          onPress={setText}
        />
        <View style={{position: 'absolute', transform: [{ translateX: 320 }, { translateY: -15 }]}}><TouchableOpacity style={styles.inputBtn}>
              <AntDesign name="arrowup" size={24} color="#FFF" style={styles.arrowBtn} />
            </TouchableOpacity></View>
         
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  photo: {
    height: 240,
    width: "auto",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 22,
    paddingTop: 32,
    paddingBottom: 22,
    backgroundColor: "#ffffff",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    paddingVertical: 16,
    paddingLeft: 16,
    position: 'relative'
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputBtn: {
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },

//   arrowBtn:{
//     flex: 1,
//     alignItems: 'flex-end',
//     justifyContent: "center",
//   }
});

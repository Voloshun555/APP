import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput, View,TouchableOpacity ,ScrollView} from "react-native";

export function FormCamera() {
  return (
    <ScrollView>
      <View
        style={{
          ...styles.inputContanier,
          
        }}>
        <TextInput placeholder="Name..." style={styles.input} />
      </View>
      <View
        style={{
          ...styles.inputContanier,
        }}>
        <TextInput placeholder="Місцевість..." style={styles.input} />
      </View>
<TouchableOpacity style={styles.addPhotoContainer}>
<Text style={styles.addTextPhoto}>Опублікувати</Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  inputContanier: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    height: 50,
    backgroundColor: "transparent",
    width: "100%",
  },
  input: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    width: "100%",
    height: 50,
  },
  addPhotoContainer:{
    backgroundColor: '#F6F6F6',
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTextPhoto:{
    color: '#BDBDBD'
  }
});

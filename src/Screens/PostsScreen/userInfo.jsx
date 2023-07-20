import { View } from "react-native";
import { Text, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export function UserInfo() {
  const { login, email } = useSelector((state) => state.auth);
  

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <Image
          style={styles.image}
          source={{
            uri: "https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg",
          }}
        />
        <View style={{ justifyContent: "center", marginLeft: 8 }}>
          <Text style={styles.textName}>{login}</Text>
          <Text>{email}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  textName: {
    fontSize: 15,
    lineHeight: 15,
    color: "#212121",
    fontWeight: 700,
  },
});

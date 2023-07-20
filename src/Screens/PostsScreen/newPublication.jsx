import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { UserInfo } from "./userInfo";
import { useEffect, useState } from "react";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { db } from "../../firabase/config";
import { collection, onSnapshot, query , orderBy} from "firebase/firestore";

export const NewPublication = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  console.log(items)


  const getAllPosts = async () => {
    const querySnapshot = query(collection(db, "setPost"),
     orderBy("createdDate")
    );
    onSnapshot(querySnapshot, (data) => {
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <UserInfo />
      <FlatList
        style={styles.containerFlatList}
        data={items}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32, flex: 1 }}>
            <View>
              <Image source={{ uri: item.photos }} style={styles.photo} />
              <Text style={{ marginTop: 10, marginBottom: 10 }}>
                Name: {item.name}
              </Text>
            </View>
            <View style={styles.navContainer}>
              <TouchableOpacity
                style={styles.comentarContainer}
                onPress={() =>
                  navigation.navigate("Comments", {
                    location: item.photo,
                    postId: item.id,
                    autorPostId: item.userId,
                  })
                }>
                <FontAwesome name="comments-o" size={24} color="black" />
                <Text>{item.commentsQuantity ? item.commentsQuantity : "0"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationContainer}
                onPress={() =>
                  navigation.navigate("MapScrean", {
                    location: item.locationName,
                  })
                }>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={24}
                  color="#BDBDBD"
                />
                <Text>{item.locationName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  containerFlatList: {
    flex: 1,
    paddingBottom: 40,
  },
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
  comentarContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
  navContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

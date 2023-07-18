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
import React, { useEffect, useState } from "react";
import SvgAdd from "../../image/svgAdd";
import {
  Feather,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { db, storage } from "../../firabase/config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { FlatList } from "react-native";

export function ProfileScreen({ navigation }) {
  const [userPost, setUserPost] = useState([]);

  const { login, userId } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const postsQuery = query(
      collection(db, "setPost"),
      where("userId", "==", userId)
    );

    onSnapshot(postsQuery, (data) => {
      setUserPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
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

          {userPost.length > 0 && (
            <View style={styles.postContainer}>
              <FlatList
                keyExtractor={(item) => item.id}
                style={{ marginBottom: 200 }}
                data={userPost}
                renderItem={({ item }) => (
                  <View style={{ marginTop: 32, flex: 1 }}>
                    <View>
                      <Image
                        source={{ uri: item.photo }}
                        style={styles.photo}
                      />
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
                        <FontAwesome
                          name="comments-o"
                          size={24}
                          color="black"
                        />
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
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
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
    height: "80%",

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
  containerFlatList: {},
  photo: {
    height: 200,
    width: 350,
    borderRadius: 8,
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
  postContainer: {
    paddingHorizontal: 16,
  },
});

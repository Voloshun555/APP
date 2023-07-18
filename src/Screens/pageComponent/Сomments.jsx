import { useEffect, useState } from "react";
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

import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firabase/config";
import { useSelector } from "react-redux";

export function Comments({ route }) {
  const { location, postId } = route.params;
  const { login, userId } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [Massege, setMassege] = useState([]);
  console.log(Massege)

  const addMassege = () => {
    uploadPostToServer();
    setComment("");
  };

  const uploadPostToServer = async () => {
    await addDoc(collection(db, `setPost`, postId, "setComents"), {
      comment,
      login,
      autorCommentId: userId,
    });
  };

  const getAllComments = async () => {
    const commentsQuery = query(
      collection(db, "setPost", postId, "setComents")
    );

    onSnapshot(commentsQuery, (data) => {
      setMassege(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <ImageBackground
          source={{ uri: location }}
          style={{ flex: 1, width: "100%", height: "100%" }}
        />
      </View>

      <FlatList
        data={Massege}
        renderItem={({ item }) => (
          <View style={[styles.commentBlock]}>
            <View style={styles.comment}>
              <Text style={styles.commentText}> name: {item.login}</Text>
            <Text style={styles.commentText}> Massege: {item.comment}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputBlock}>
        <TextInput
          style={styles.input}
          onChangeText={setComment}
          value={comment}
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
    marginTop: 10,
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

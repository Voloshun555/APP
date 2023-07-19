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
import { format, utcToZonedTime } from "date-fns-tz";
import { uk } from "date-fns/locale";

import {
  collection,
  addDoc,
  query,
  setDoc,
  onSnapshot,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../firabase/config";
import { useSelector } from "react-redux";

export function Comments({ route }) {
  const { location, postId, autorPostId } = route.params;
  const { login, userId } = useSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [Massege, setMassege] = useState([]);

  const addMassege = () => {
    uploadPostToServer();
    setComment("");
  };

  const uploadPostToServer = async () => {
    const date = new Date();
    const nyDate = utcToZonedTime(date, "Europe/Kiev");
    const dataPost = format(nyDate, "yyyy-MM-dd HH:mm:ss zzz", {
      locale: uk,
    });

    await addDoc(collection(db, `setPost`, postId, "setComents"), {
      comment,
      login,
      autorCommentId: userId,
      dataPost,
    });

    const commentRef = doc(db, `setPost`, postId);
    await setDoc(
      commentRef,
      { commentsQuantity: Massege.length + 1 },
      { merge: true },
      { capital: true },
    );
  };

  const getAllComments = async () => {
    const commentsQuery = query(
      collection(db, "setPost", postId, "setComents"),
      orderBy("dataPost")
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
          <View style={[styles.commentBlock, userId === item.autorCommentId ? {marginLeft: 'auto', borderColor: 'green'} :{marginRight: 'auto',borderColor: 'red'}]}>
            <View style={styles.comment}>
              <Text style={styles.commentText}> автор: {item.login}</Text>
              <Text style={styles.commentText}>
                Повідомлення: {item.comment}
              </Text>
              <Text style={styles.commentText}>data: {item.dataPost}</Text>
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
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 25,
  },

  commentBlockUser: {
    flexDirection: "row-reverse",
  },

  comment: {
    padding: 4,
    borderRadius: 6,
  },

  commentText: {
    fontSize: 16,
    marginBottom: 4,
  },
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

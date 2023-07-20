import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { AntDesign, Feather, Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { CreatCamera } from "../creatCamera/CreatCamera";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { pickImage } from "../pickImage/PickImage";
import * as Location from "expo-location";

import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firabase/config";
import { useSelector } from "react-redux";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export function CreatePostsScreen({ navigation }) {
  const { userId, login } = useSelector((state) => state.auth);

  const [form, setForm] = useState("");
  const [location, setLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [name, setName] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [locationPhoto, setLocationPhoto] = useState(null);
  // const [urlPhoto, setUrlPhoto] = useState(null);
  // const { imageUrl: photo } = form;

  function ClearPost() {
    setLocationName(null);
    setName(null);
    setForm("");
  }

  async function sendPost() {
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocationPhoto(coords);
    uploadPostToServer();
    navigation.navigate("Публікації");
    setForm("");
    setName(null);
    setLocationName(null);
  }

  const uploadPostToServer = async () => {
    const photos = await creatPhotoServer();
    const createdDate = Date.now();
    await addDoc(collection(db, `setPost`), {
      photo: form.imageUrl,
      name,
      location,
      locationName,
      userId,
      login,
      createdDate,
      photos
    });
  };

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(cameraStatus === "granted");
    })();

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const onImagePick = async () => {
    const result = await pickImage();
    const imageUrl = result?.assets[0].uri || null;

    setForm((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

const creatPhotoServer = async()=>{
  const response = await fetch(form.imageUrl);
  const file = await response.blob();
  const uniquePostId = Date.now().toString();
  const storageRef = ref(storage, `postImage/${uniquePostId}`);
  await uploadBytes(storageRef, file);
  const processedPhoto = await getDownloadURL(storageRef);
    return processedPhoto;
}

  return (
    <>
      <CreatCamera
        cameraStatus={cameraStatus}
        setCameraStatus={setCameraStatus}
        hasPermission={hasPermission}
        photo={form.imageUrl}
        setForm={setForm}
      />
      {!cameraStatus && (
        <View style={styles.container}>
          <ImageBackground
            style={styles.FotoContainer}
            source={{ uri: form.imageUrl }}>
            <View style={styles.IconContainerCamera}>
              <TouchableOpacity
                onPress={() => setCameraStatus(true)}
                style={styles.iconCameraContauner}>
                <Feather
                  name="camera"
                  size={24}
                  color="#BDBDBD"
                  style={styles.iconCamera}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <TouchableOpacity onPress={onImagePick}>
            <Text>Завантажте фото</Text>
          </TouchableOpacity>

          <View>
            <View
              style={{
                ...styles.inputContanier,
              }}>
              <TextInput
                onChangeText={setName}
                value={name}
                placeholder="Name..."
                style={styles.input}
              />
            </View>
            <View>
              <TextInput
                placeholder="Місцевість....."
                value={locationName}
                onChangeText={setLocationName}
                style={styles.inputLocal}
              />
              <Entypo
                name="location-pin"
                size={24}
                color="grey"
                style={styles.marker}
              />
            </View>
            <TouchableOpacity
              onPress={sendPost}
              disabled={!name || !form || !locationName}
              style={[
                !name || !form || !locationName
                  ? styles.addPhotoContainer
                  : styles.AddBackColor,
              ]}>
              <Text
                style={[
                  !name || !form || !locationName
                    ? styles.addTextPhoto
                    : styles.AddRextColor,
                ]}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteIcon} onPress={ClearPost}>
              <AntDesign name="delete" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  AddBackColor: {
    backgroundColor: "#FF6C00",
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    color: "#FFFFFF",
  },
  AddRextColor: {
    color: "#FFFFFF",
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    lineHeight: 19,
    color: "#BDBDBD",
    width: "100%",
    height: 50,
  },
  inputLocal: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    lineHeight: 19,
    color: "#BDBDBD",
    width: "100%",
    height: 50,
    paddingLeft: 32,
  },
  marker: {
    flex: 1,
    position: "absolute",
    marginTop: 13,
  },
  addPhotoContainer: {
    backgroundColor: "#F6F6F6",
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  addTextPhoto: {
    color: "#BDBDBD",
  },
  iconCamera: {
    transform: [{ translateX: 18 }, { translateY: 18 }],
  },
  FotoContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 8,
    marginTop: 34,
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  iconCameraContauner: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
  },

  container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  deleteIcon: {
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 40,
  },
  deleteContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

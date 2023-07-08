import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { FormCamera } from "./formCamera";
import { CreatCamera } from "../creatCamera/CreatCamera";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

import { pickImage } from "../pickImage/PickImage";

export function CreatePostsScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraStatus, setCameraStatus] = useState(false);
  const [urlPhoto, setUrlPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(cameraStatus === "granted");
    })();
  }, []);

  const onImagePick = async () => {
    const result = await pickImage();
    const imageUrl = result?.assets[0].uri || null;
    setUrlPhoto(imageUrl);
  };

  return (
    <>
      <CreatCamera
        cameraStatus={cameraStatus}
        setCameraStatus={setCameraStatus}
        setUrlPhoto={setUrlPhoto}
        urlPhoto={urlPhoto}
        hasPermission={hasPermission}
      />
      {!cameraStatus && (
        <View style={styles.container}>
          <ImageBackground
            style={styles.FotoContainer}
            source={{
              uri: urlPhoto
            }}>
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

          <FormCamera />
          <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteIcon}>
              <AntDesign name="delete" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

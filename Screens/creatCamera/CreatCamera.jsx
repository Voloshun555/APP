import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export function CreatCamera(props) {
  const { cameraStatus, setCameraStatus } = props;
  const [cameraRef, setCameraRef] = useState(null);
  const [urlPhoto, setUrlPhoto] = useState(null);

  const [type, setType] = useState(CameraType.back);
  const takePhoto = async () => {
    const takePhotoRef = await cameraRef.takePictureAsync();
    setUrlPhoto(takePhotoRef.uri);
  };

  return (
    <>
      {urlPhoto && (
        <View>
          <ImageBackground
            source={{ uri: urlPhoto }}
            style={{ width: "100%", height: "100%" }}>
              <View style={styles.containerBtn}>
                <TouchableOpacity
              onPress={() => {
                setCameraStatus(false);
              }}>
              <MaterialIcons
                name="add-photo-alternate"
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setUrlPhoto(null);
              }}>
              <Entypo name="back" size={32} color="white" />
            </TouchableOpacity>
            </View>
            
          </ImageBackground>
        </View>
      )}
      {cameraStatus && (
        <View style={styles.container}>
          <Camera style={styles.camera} ref={setCameraRef} type={type}>
            <View style={styles.containerBtn}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  );
                }}
                style={styles.btnBackCameraContainer}>
                <Ionicons
                  name="camera-reverse-outline"
                  size={30}
                  color="white"
                  style={styles.btnBackCamera}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  if (cameraRef) {
                    await takePhoto();
                  }
                }}
                style={styles.snapContainer}>
                <Feather
                  name="camera"
                  size={40}
                  color="white"
                  style={styles.cameraBtn}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setCameraStatus(false);
                }}
                style={styles.btnBackCameraContainer}>
                <Feather
                  name="camera-off"
                  size={30}
                  color="white"
                  style={styles.btnBackCamera}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    flex: 1,
    alignContent: "center",
    justifyContent: "flex-end",
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: { alignSelf: "center" },

  snapContainer: {
    borderWidth: 2,
    borderColor: "white",
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  cameraBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnBackCamera: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnBackCameraContainer: {
    alignItems: "flex-end",
    marginRight: 20,
  },
  containerBtn: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
});

// import { View, TouchableOpacity, Text, StyleSheet,ImageBackground } from "react-native";
// import { Camera, CameraType } from "expo-camera";
// import { Entypo, Feather, Ionicons,MaterialIcons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import * as Location from 'expo-location';

// export function CreatCamera(props) {
//    const { cameraStatus, setCameraStatus, } = props;
//   const [cameraRef, setCameraRef] = useState(null);
//   const [urlPhoto, setUrlPhoto] = useState(null);

//   const [type, setType] = useState(CameraType.back);

//   const takePhoto = async () => {
//     const takePhotoRef = await cameraRef.takePictureAsync();
//    console.log(takePhotoRef.uri)
//     setUrlPhoto(takePhotoRef.uri);
//   };

//   return (
//     <>
{
  /* {urlPhoto &&  (<View>
          <ImageBackground
            source={{ uri: photo }}
          >
            <TouchableOpacity
              
              onPress={() => {
                setCameraStatus(false);
              }}
            >
              <MaterialIcons
                name="add-photo-alternate"
                size={32}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity
              
              onPress={() => {
                setUrlPhoto((prev) => ({ ...prev, imageUrl: null }));
              }}
            >
              <Entypo name="back" size={32} color="white" />
            </TouchableOpacity>
          </ImageBackground>
        </View>)} */
}
//       {cameraStatus && (
//         <View style={styles.container}>
//           <Camera style={styles.camera} ref={setCameraRef} type={type}>
//             <View style={styles.containerBtn}>
//               <TouchableOpacity
//                 onPress={() => {
//                   setType(
//                     type === CameraType.back
//                       ? CameraType.front
//                       : CameraType.back
//                   );
//                 }}
//                 style={styles.btnBackCameraContainer}>
//                 <Ionicons
//                   name="camera-reverse-outline"
//                   size={30}
//                   color="white"
//                   style={styles.btnBackCamera}
//                 />
//               </TouchableOpacity>

//               <TouchableOpacity
//                 onPress={async () => {
//                   if (cameraRef) {
//                     await takePhoto();
//                   }
//                 }}
//                 style={styles.snapContainer}>
//                 <Feather
//                   name="camera"
//                   size={40}
//                   color="white"
//                   style={styles.cameraBtn}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => {
//                   setCameraStatus(false);
//                 }}
//                 style={styles.btnBackCameraContainer}>
//                 <Feather
//                   name="camera-off"
//                   size={30}
//                   color="white"
//                   style={styles.btnBackCamera}
//                 />
//               </TouchableOpacity>
//             </View>
//           </Camera>
//         </View>
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   camera: {
//     flex: 1,
//     alignContent: "center",
//     justifyContent: "flex-end",
//   },
//   photoView: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "flex-end",
//   },

//   flipContainer: {
//     flex: 0.1,
//     alignSelf: "flex-end",
//   },

//   button: { alignSelf: "center" },

//   snapContainer: {
//     borderWidth: 2,
//     borderColor: "white",
//     height: 70,
//     width: 70,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//   },

//   cameraBtn: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnBackCamera: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   btnBackCameraContainer: {
//     alignItems: "flex-end",
//     marginRight: 20,
//   },
//   containerBtn: {
//     alignItems: "center",
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 20,
//   },
// });
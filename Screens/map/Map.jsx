import { StyleSheet } from "react-native"

export function Map () {
    const [location, setLocation] = useState(null);

    useEffect(() => {
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
    return(
        <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && (
          <Marker title="I am here" coordinate={location} description="Hello" />
        )}
      </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
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
})
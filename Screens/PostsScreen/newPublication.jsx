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
import { FontAwesome , MaterialCommunityIcons} from '@expo/vector-icons'; 

export const NewPublication = ({ route, navigation }) => {
  const [items, setItems] = useState([]);
  console.log(route.params);
  useEffect(() => {
    if (route.params) {
      setItems((prev) => [...prev, route.params]);
    }
  }, [route.params]);

  return (
    <ScrollView style={styles.container}>
      <UserInfo />
      <FlatList
      
        data={items}
        renderItem={({ item }) => (
          <View style={{marginTop: 32, flex: 1}}>
            <View>
              <Image
                source={{ uri: item.form.imageUrl }}
                style={styles.photo}
              />
              <Text>{item.name}</Text>
            </View>
            <TouchableOpacity >
            <FontAwesome name="comments-o" size={24} color="black" />
              <Text>0</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={24}
                  color="#BDBDBD"
                />
                <Text>{item.locationName}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
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
});

import { Text,View, StyleSheet,FlatList } from "react-native"
import { UserInfo } from "./userInfo";

export const NewPublication = () => {
    return (
        <View style={styles.container}>
           <UserInfo/>
        </View>
      );
    };
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingRight: 16,
        paddingLeft: 22,
        paddingTop: 32,
        paddingBottom: 22,
        backgroundColor: "#ffffff",
      },
    });
    
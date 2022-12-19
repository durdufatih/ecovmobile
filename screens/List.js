import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function List() {
  const navigation = useNavigation();
  const [list, setList] = useState([]);

  const handleAddScreen = () => {
    navigation.replace("AddCardScreen");
  };
  return (
    <SafeAreaView style={styles.containerFull}>
      <View style={styles.viewStyle}>
        {list.length == 0 ? (
          <TouchableOpacity onPress={handleAddScreen} style={styles.button}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
        ) : (
          <Text>List</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default List;

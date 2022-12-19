import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text } from "react-native";

function Favorite() {
  return (
    <SafeAreaView style={styles.containerFull}>
      <Text>Favorite</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    containerFull: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
  });
export default Favorite;

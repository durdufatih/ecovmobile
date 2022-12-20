import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ColorPicker } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";

import {
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db, storage } from "../firebase";

function AddCardScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [firstBanner, setFirstBanner] = useState("");
  const [title, setTitle] = useState("");
  const [secondBanner, setSecondBanner] = useState("");
  const [gsm, setGsm] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [address, setAdress] = useState("");
  const [image, setImage] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const name = uuid.v4();
      var ref = storage.ref("img/" + name + ".jpeg");
      const task = ref.put(blob);

      task.on("state_changed", (taskSnapshot) => {
        console.log(`${taskSnapshot.bytesTransferred} transferred 
  out of ${taskSnapshot.ref}`);
        setImage(taskSnapshot.ref);
      });
      task.then(() => {
        console.log("Image uploaded to the bucket!");
      });
    }
  };

  
  const createCard = async () => {

    db.collection("/cards")
      .doc()
      .set({
        userId: auth.currentUser.email,
        name: name,
        firstBanner: firstBanner,
        title: title,
        secondBanner: secondBanner,
        gsm: gsm,
        phone: phone,
        email: email,
        web: web,
        address: address,
      })
      .then(() => {
        navigation.replace("Home");
        console.log("Data set.");
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.containerFull}>
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <Text>Background Image:</Text>
              <Button
                title="Pick an image"
                onPress={pickImage}
              />
              {image && <Image source={{ uri: image }} />}
            </View>
            <View style={styles.inputView}>
              <Text>Name:</Text>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text>Name Background Color:</Text>
              <ColorPicker
                selectedColor={firstBanner}
                onSelect={(color) => setFirstBanner(color)}
              />
            </View>
            <View style={styles.inputView}>
              <Text>Title:</Text>
              <TextInput
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <Text>Title Background Color:</Text>
              <ColorPicker
                selectedColor={secondBanner}
                onSelect={(color) => setSecondBanner(color)}
              />
            </View>

            <View style={styles.inputView}>
              <Text>Gsm:</Text>
              <TextInput
                placeholder="Gsm"
                value={gsm}
                onChangeText={(text) => setGsm(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputView}>
              <Text>Phone:</Text>
              <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputView}>
              <Text>Email:</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputView}>
              <Text>Web:</Text>
              <TextInput
                placeholder="Web"
                value={web}
                onChangeText={(text) => setWeb(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.inputView}>
              <Text>Address:</Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                placeholder="Address"
                value={address}
                onChangeText={(text) => setAdress(text)}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={createCard}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  inputView: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AddCardScreen;

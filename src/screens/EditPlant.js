import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Image,
} from "react-native";
import InputImage from "../components/InputImage";
import { useState } from "react";
import db from "../config/firebasedatabase";
import { updateDoc, doc } from "firebase/firestore";
import InputImageDescription from "../components/InputImageDescription";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebasedatabase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function NewPlant({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const idTask = route.params.id;
  const [description, setDescription] = useState(route.params.description);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(route.params.image);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const editPlant = async () => {
    try {
      const docRef = await updateDoc(doc(db, route.params.idUser, idTask), {
        name: name,
        description: description,
        image: imageURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(true);
      setMessage("Erro ao cadastrar planta");
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      //aqui faz a conversao da imagem para blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "Plants/" + Date.now() + ".jpg");
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setImageURL(downloadURL);
            // console.log("marioooo", imageURL);
          });
        }
      );
    };

    if (image !== null) {
      uploadImage();
      setImage(null);
    }
  }, [image]);
  return (
    <View style={styles.container}>
      <ScrollView>
        {error === true && <Text style={styles.error}>{message}</Text>}
        {imageURL != "" && (
          <Image
            marginTop={10}
            source={{ uri: imageURL }}
            style={{ width: "100%", height: 150, borderRadius: 10 }}
          />
        )}
        <InputImage
          placeholder="Nome"
          imageName="leaf"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <InputImageDescription
          placeholder="Descricao"
          imageName="leaf"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Escolha uma imagem da galeria"
            color="#2F4F4F"
            onPress={pickImage}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cadastrar"
            color="#2F4F4F"
            style={styles.byton}
            onPress={() => editPlant() && navigation.navigate("Home", { idUser: route.params.idUser })}
          >
            Cadastrar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Monitorar"
            color="#800080"
            style={[styles.byton, { backgroundColor: 'red' }]} 
            onPress={() => navigation.navigate("Clima", {                   
              id: idTask,
              name: name,
              description: description,
              idUser: route.params.idUser, })}
          >
            Monitorar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Voltar"
            color="#2F4F4F"
            style={styles.byton}
            onPress={() => navigation.navigate("Home", { idUser: route.params.idUser })}
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3CB371",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    overflow: "hidden",
    color: "#2F4F4F",
  },
  buttonText: {
    color: 'red'
  },

});

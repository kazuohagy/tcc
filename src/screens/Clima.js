import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import InputImage from "../components/InputImage";
import { useState } from "react";
import db from "../config/firebasedatabase";
import { updateDoc, doc } from "firebase/firestore";
import InputImageDescription from "../components/InputImageDescription";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../config/firebasedatabase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { Feather } from "@expo/vector-icons";
import MainCard from "../components/MainCard";

export default function Clima({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const idTask = route.params.id;
  const [description, setDescription] = useState(route.params.description);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(route.params.image);
  const [darktheme, setDarktheme] = useState(true);
  const [temperatura, setTemperatura] = useState("");
  const [umidade, setUmidade] = useState("");
  const [luminosidade, setLuminosidade] = useState("");
  const [vento, setVento] = useState("");
  const [pressao, setPressao] = useState("");
  const [nuvens, setNuvens] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");

  // Estilos para o css
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darktheme ? "#232634" : "#fff",
      // alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    buttonContainer: {
      flex: 1,
      borderRadius: 20,
      alignItems: "center",
      marginTop: 20,
      width: "100%",

      overflow: "hidden",
    },
    text: {
      textAlign: "center",
      color: darktheme ? "#fff" : "#000",
    },
    temp: {
      textAlign: "center",
      fontSize: 30,
      color: darktheme ? "#fff" : "#000",
    },
    refreshButton: {
      position: "absolute",
      top: 0,

      alignSelf: "flex-start",
    },
    darkMode: {
      alignSelf: "flex-end",
    },
    cardView: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
  console.log(route.params);

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

  return (
    <View style={styles.container}>
      <ScrollView>
        {error === true && <Text style={styles.error}>{message}</Text>}
        {/* <Feather name="sun" size={30} color="orange" /> */}

        <TouchableOpacity
          onPress={() => setDarktheme(!darktheme)}
          style={styles.refreshButton}
        >
          <Feather
            name="refresh-ccw"
            size={30}
            color={darktheme ? "orange" : "black"}
          />
        </TouchableOpacity>

        <Icon
          style={[{ marginTop: 20, textAlign: "center" }]}
          name="sun-o"
          size={30}
          color="orange"
        />
        <Text style={styles.temp}>27 graus</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.cardView}>
          <MainCard
            title={"Manhã"}
            backgroundColor={darktheme ? "#FF8C00" : "#FFA500"}
            dark={darktheme}
            temperatura={"11"}
            icon={1}
          ></MainCard>
          <MainCard
            title={"Tarde"}
            backgroundColor={darktheme ? "#FFB600" : "#FFD700"}
            dark={darktheme}
            temperatura={temperatura}
            icon={1}
          ></MainCard>
          <MainCard
            title={"Noite"}
            backgroundColor={darktheme ? "#000033" : "#000080"}
            dark={darktheme}
            temperatura={temperatura}
            icon={1}
          ></MainCard>
        </View>
        <TouchableOpacity
          style={styles.darkMode}
          onPress={() => setDarktheme(!darktheme)}
        >
          <Feather
            name={darktheme ? "sun" : "moon"}
            size={30}
            color={darktheme ? "orange" : "black"}
          />
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            title="Voltar"
            color="#2F4F4F"
            style={styles.byton}
            onPress={() =>
              navigation.navigate("Home", { idUser: route.params.idUser })
            }
          >
            Voltar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

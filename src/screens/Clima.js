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
import getCurrentWeather from "../api/ConsultApi";
import InfoCard from "../components/InfoCard";
import * as Location from 'expo-location';



export default function Clima({ navigation, route }) {
  const [name, setName] = useState(route.params.name);
  const idTask = route.params.id;
  const [description, setDescription] = useState(route.params.description);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(route.params.image);
  const [darktheme, setDarktheme] = useState(true);
  const [currentTemperature, setCurrentTemperature] = useState("");
  const [umidade, setUmidade] = useState("");
  const [luminosidade, setLuminosidade] = useState("");
  const [vento, setVento] = useState("");
  const [pressao, setPressao] = useState("");
  const [nuvens, setNuvens] = useState("");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const[wind, setWind] = useState("");
  const[umidity, setUmidity] = useState("");
  const[tempMin, setTempMin] = useState("");
  const[tempMax, setTempMax] = useState("");
  const[imageWeather, setImageWeather] = useState("");


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
    info: {
      alignItems: "center",
      backgroundColor: darktheme ? "#393e44" : "#fff",
      borderRadius: 20,
      margin: 10,
      width: "93%",
      height: 230,
    },
    infoText: {
      color:darktheme ? "#fff" : "#000",
      fontSize: 20,
      fontWeight: "bold",
      
    },
    InfoCards:{
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    imageContainer: {
      marginTop: 'auto',
      marginBottom: 'auto',
      alignItems: 'center',
    },
    image: {
      width: 50,
      height: 50,
    },

  });


  let text = 'Waiting..';
  // defina uma variavel json vazia
  let json = {};

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  //nao sei por que mas criei um json que na rela esse location provavelmente ja e um json entao nao precisa fazer isso mas como estou cansado vou deixar assim e nao vou arrumar depois :)
  
  const showWeatherData = async (json) => {
    const dados = await getCurrentWeather(json);
    console.log("AAAAAAAAAAAAA")
    console.log(dados.weather[0].description);
    setDescription(dados.weather[0].description);
    setCurrentTemperature(dados.main.temp);
    setUmidade(dados.main.humidity);
    setLuminosidade(dados.main.feels_like);
    setVento(dados.wind.speed);
    setPressao(dados.main.pressure);
    setNuvens(dados.clouds.all);
    setCidade(dados.name);
    setPais(dados.sys.country);
    setData(dados.dt);
  
    setWind(dados.wind.speed);
    setUmidity(dados.main.humidity);
    setTempMin(dados.main.temp_min);
    setTempMax(dados.main.temp_max);
    setImageWeather(dados.weather[0].icon);
    

    
  };
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      showWeatherData(location.coords)
      hora();
    })();
    //arrumar esse coords que ta estragando tudo
  }, []);
  function hora(){
    const offsetInSeconds = -25200;
    const date = new Date();
    const offsetInMilliseconds = offsetInSeconds * 1000;
    const targetTime = new Date(date.getTime() + offsetInMilliseconds);
    const formattedTime = targetTime.toLocaleTimeString();
    console.log(formattedTime);
    setHorario(formattedTime);
  }


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
        <Text></Text>
        {/* caso queira os dados da localizacao so descomentar a linha abaixo */}
        {/* <Text style={styles.text}>{text}</Text> */}
        <Text style={styles.text}>{cidade}</Text>
        <Text style={styles.text}>{pais}</Text>
        <Text style={styles.text}>{horario}</Text>


        <View style={styles.imageContainer}>
          <Image source = {{uri:`https://openweathermap.org/img/wn/${imageWeather}.png`}} style={styles.image}/>
        </View>

        <Text style={styles.temp}>{currentTemperature} °C</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{description}</Text>
        <View style={styles.cardView}>
          <MainCard
            title={"Manhã"}
            backgroundColor={darktheme ? "#FFB600" : "#FFD700"}
            dark={darktheme}
            temperatura={"11" + '°C'}
            icon={1}
          ></MainCard>
          <MainCard
            title={"Tarde"}
            backgroundColor={darktheme ? "#FF8C00" : "#FFA500"}
            dark={darktheme}
            temperatura={"10" + '°C'}
            icon={2}
          ></MainCard>
          <MainCard
            title={"Noite"}
            backgroundColor={darktheme ? "#000033" : "#000080"}
            dark={darktheme}
            temperatura={"8" + '°C'}
            icon={3}
          ></MainCard>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>Informacoes adicionais</Text>
          <View style={styles.InfoCards}>
          <InfoCard title={'Vento'} value={wind + 'km/h'}></InfoCard>
          <InfoCard title={'Umidade'} value={umidity + '%'}></InfoCard>
          <InfoCard title={'Temp. Min'} value={tempMin + '°C'}></InfoCard>
          <InfoCard title={'Temp. Max'} value={tempMax + '°C'}></InfoCard>
          </View>
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

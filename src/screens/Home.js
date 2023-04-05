import * as React from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import db from "../config/firebasedatabase";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import {auth} from '../config/firebaseconfig';
import {signOut} from "firebase/auth";

function Feed({ navigation, route }) {
  const [plants, setPlants] = useState([]);
  console.log("ESSAS SAO AS PLANTAS DESGRACA", route.params.idUser);
  function deletePlant(id) {
    const plantRef = doc(collection(db, route.params.idUser), id);
    deleteDoc(plantRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, route.params.idUser));
      const list = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        list.push({ ...doc.data(), id: doc.id });
      });
      setPlants(list);
    };
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, route.params.idUser));
        const list = [];
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          list.push({ ...doc.data(), id: doc.id });
        });
        setPlants(list);
      };
      fetchData();
    }, [])
  );
  // console.log("ESSAS SAO AS PLANTAS DESGRACA");
  // console.log(plants);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={plants}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonNewPlant}
              onPress={() => deletePlant(item.id)}
            >
              <Icon
                name="trash"
                size={18}
                color="#3CB371"
                style={styles.Icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonNewPlant}
              onPress={() =>
                navigation.navigate("EditPlant", {
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  image: item.image,
                  idUser: route.params.idUser,
                })
              }
            >
              <View style={styles.row}>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 120, height: 120, borderRadius: 10 }}
                  />
                )}
                <View style={styles.content}>
                  <Text style={{ color: "#3CB371" }}>{item.name}</Text>
                  <Text>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("NewPlant",{idUser: route.params.idUser})}>
        <Text style={styles.iconButton}>Adicionar planta</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    overflow: "hidden",
  },
  iconButton: {
    color: "#3CB371",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 200,
    marginTop: 20,
  },
  buttonNewPlant: {
    color: "#3CB371",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  row: {
    flexDirection: "row",

    alignItems: "center",
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
});

function Profile({navigation}) {
  function logoff() {
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>

      <TouchableOpacity onPress={() => logoff()}>
        <Text style={styles.iconButton}>
          Sign Out  <Icon name="sign-out" size={18} color="#3CB371" style={styles.Icon}/>
        </Text>
          
      </TouchableOpacity>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Home(route) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#3CB371",
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        initialParams={{ idUser: route.route.params.idUser}}
        options={{
          tabBarLabel: "Home",
          headerTintColor: "#3CB371",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: "Updates",
          headerTintColor: "#3CB371",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          headerTintColor: "#3CB371",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

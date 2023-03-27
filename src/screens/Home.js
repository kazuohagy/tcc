import * as React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import db from "../config/firebasedatabase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
function Feed({ navigation }) {
  const [plants, setPlants] = useState([]);
  function deletePlant(id) {
    db.collection("Plants")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "Plants"));
      const list = [];
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        list.push({ ...doc.data(), id: doc.id });
      });
      setPlants(list);
    };
    fetchData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "Plants"));
        const list = [];
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          list.push({ ...doc.data(), id: doc.id });
        });
        setPlants(list);
      };
      fetchData();
    }, [])
  );
  console.log("ESSAS SAO AS PLANTAS DESGRACA");
  console.log(plants);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={plants}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonNewPlant}
              onPress={() => navigation.navigate("EditPlant")}
            >
              <Text style={{ color: "#3CB371" }}>{item.name}</Text>
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
              <Text>{item.description}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => navigation.navigate("NewPlant")}>
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
  caixa: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
});

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
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

export default function Home() {
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

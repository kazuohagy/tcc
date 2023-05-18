import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const InfoCard = (props) => {
  const Icon = () => {
    if (props.icon == 1) {
      return <Feather name="sun" style={styles.ico} size={40} color="black" />;
    } else if (props.icon == 2) {
      return (
        <Ionicons
          name="partly-sunny-outline"
          size={40}
          style={styles.ico}
          color="black"
        />
      );
    } else if (props.icon == 3) {
      return <Feather name="moon" style={styles.ico} size={40} color="black" />;
    }
  };
  const styles = StyleSheet.create({
    card: {
      backgroundColor: props.backgroundColor,
      justifyContent: "space-around",
      alignItems: "center",
      borderRadius: 20,
      margin: 10,
      width: 110,
      height: 110,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#fff",
    },
    ico: {
      color: "#fff",
    },
  });
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>

      <Icon />
      <Text style={styles.cardTitle}>{props.temperatura}</Text>
    </View>
  );
};
export default InfoCard;

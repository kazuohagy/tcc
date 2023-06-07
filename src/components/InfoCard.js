import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


const InfoCard = (props) => {

  const styles = StyleSheet.create({
    card: {
      alignItems: "center",
      margin: 10,
      minWidth: 150,
    },
    cardTitle: {
      fontWeight: "bold",
      color: props.dark ? "#fff" : "#000",
 
    },
    ico: {
      color: "#fff",
    },
  });
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardTitle}>{props.value}</Text>
    </View>
  );
};
export default InfoCard;

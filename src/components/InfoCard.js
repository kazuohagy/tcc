import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";


const InfoCard = (props) => {

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

   
      <Text style={styles.cardTitle}>{props.temperatura}</Text>
    </View>
  );
};
export default InfoCard;

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('./assets/gaia.png')} style={styles.Image}></Image>
      <Text style={styles.Label}>GAIA</Text>
      <TextInput style={styles.Input} onChangeText={text=>setEmail(text)} placeholder="Email" />
      <TextInput  style={styles.Input} onChangeText={text=>setPassword(text)} placeholder="Senha" secureTextEntry />
      <View style={styles.buttonContainer}>
        <Button title="Entrar" color="#2F4F4F" onPress={() => console.log('Botão Entrar pressionado')} />
      </View>
      <Text style={styles.Label1}>Não tem uma conta?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" color="#2F4F4F" onPress={() => console.log('Botão Cadastrar pressionado')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3CB371',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Image:{
    width: 112,
    height: 100,
  },
  Label:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Label1:{
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  Input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#fff',
    width: 300,
    borderRadius:20

  },
  buttonContainer: {
    marginTop: 20,
    width: 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

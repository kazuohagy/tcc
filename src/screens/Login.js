import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import InputImage from '../components/InputImage';
export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const entrar = () => {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}]
      })
    }

    return(
        <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require('../assets/irrigacao.png')} style={styles.Image}></Image>
        
        <InputImage placeholder="Email" imageName="envelope" onChangeText={text => setEmail(text)} value={email}  />
        <InputImage placeholder="Senha" imageName="lock" onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} />

        <View style={styles.buttonContainer}>
          <Button title="Entrar" color="#2F4F4F" onPress={() => entrar()} />
        </View>
        <Text style={styles.Label1}>Não tem uma conta?</Text>
        <View style={styles.buttonContainer}>
          <Button title="Cadastrar" color="#2F4F4F" onPress={()=>props.navigation.navigate('Cadastro')} />
        </View>
      </View>
    )
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
      borderRadius: 20,
      marginBottom: 20,
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
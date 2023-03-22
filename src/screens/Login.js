import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import InputImage from '../components/InputImage';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebaseconfig';
export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    //remove o voltar do header
    const entrar = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        props.navigation.navigate('Home',{idUser: user.uid})
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage)
        setErrorLogin(true)
      });

    }

    return(
        <View style={styles.container}>
        <StatusBar style="auto" />
        <Image source={require('../assets/irrigacao.png')} style={styles.Image}></Image>
        {errorLogin === true && <Text style={styles.error}>{message}</Text>}
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
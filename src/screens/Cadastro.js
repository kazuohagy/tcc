import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import InputImage from '../components/InputImage';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebaseconfig';

export default function Cadastro(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    const cadastrar = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Cadastrado com sucesso")
        console.log(user)
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMessage(errorMessage)
        setErrorLogin(true)
        // ..
    });
    }

    return(
        <View style={styles.container}>
            {errorLogin === true && <Text style={styles.error}>{message}</Text>}
             <InputImage placeholder="Email" imageName="envelope" onChangeText={text => setEmail(text)} value={email}  />
             <InputImage placeholder="Senha" imageName="lock" onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} />
            <View style={styles.buttonContainer}>
            <Button title='Cadastrar'color="#2F4F4F" style={styles.byton} onPress={()=>cadastrar()}>Cadastrar</Button>
            </View>
            <View style={styles.buttonContainer}>
            <Button title='Voltar'color="#2F4F4F" style={styles.byton} onPress={()=>props.navigation.navigate('Login')}>Voltar</Button>
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
    buttonContainer: {
        marginTop: 20,
        width: 300,
        borderRadius: 20,
        overflow: 'hidden',
    }
});
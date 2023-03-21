import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import InputImage from '../components/InputImage';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Cadastro(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);

    const login = () => {
    const auth = getAuth();
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
             <InputImage placeholder="Nome" imageName="user" onChangeText={text => setName(text)} value={name}  />
             <InputImage placeholder="Email" imageName="envelope" onChangeText={text => setEmail(text)} value={email}  />
             <InputImage placeholder="Senha" imageName="lock" onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} />
            <View style={styles.buttonContainer}>
            <Button title='Cadastrar'color="#2F4F4F" style={styles.byton} onPress={()=>login()}>Cadastrar</Button>
            </View>
            <View style={styles.buttonContainer}>
            <Button title='Voltar'color="#2F4F4F" style={styles.byton} onPress={()=>props.navigation.navigate('Home')}>Voltar</Button>
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
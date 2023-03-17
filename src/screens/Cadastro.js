import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import InputImage from '../components/InputImage';
import { useState } from 'react';

export default function Cadastro(props){
    console.log(props)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    return(
        <View style={styles.container}>
             <InputImage placeholder="Nome" imageName="user" onChangeText={text => setName(text)} value={name}  />
             <InputImage placeholder="Email" imageName="envelope" onChangeText={text => setEmail(text)} value={email}  />
             <InputImage placeholder="Senha" imageName="lock" onChangeText={text => setPassword(text)} value={password} secureTextEntry={true} />
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
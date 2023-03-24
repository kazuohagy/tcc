import React from 'react';
import {StyleSheet, Text,Button, View} from 'react-native';
import InputImage from '../components/InputImage';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebaseconfig';
import db from '../config/firebasedatabase';
import { collection, addDoc } from "firebase/firestore";
export default function NewPlant({navigation}){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const addPlant = async () => {
        try {
            const docRef = await addDoc(collection(db, "Plants"), {
              name: name,
              description: description,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            setError(true);
            setMessage('Erro ao cadastrar planta');
          }
    }

    return(
        <View style={styles.container}>
            {error === true && <Text style={styles.error}>{message}</Text>}
             <InputImage placeholder="Nome" imageName="leaf" onChangeText={text => setName(text)} value={name}  />
             <InputImage placeholder="Descricao" imageName="leaf" onChangeText={text => setDescription(text)} value={description} />
            <View style={styles.buttonContainer}>
            <Button title='Cadastrar'color="#2F4F4F" style={styles.byton} onPress={()=>addPlant() && navigation.navigate("Home") }>Cadastrar</Button>
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
    },
    description: {
        height: 100,
    }
});
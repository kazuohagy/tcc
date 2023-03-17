import React from 'react';
import { View, Image, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputImage = ({ imageName, placeholder, onChangeText, value, secureTextEntry}) => {
    return (
        <View >
        <Image ></Image>
        <TextInput placeholder={placeholder} style={styles.Input} onChangeText={onChangeText} value={value} secureTextEntry={secureTextEntry} />
        <Icon name={imageName} size={18} color="#3CB371" style={styles.Icon} />
        </View>
    );
}
const styles = StyleSheet.create({
    Input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#fff',
        width: 300,
        borderRadius:20,
        paddingRight:40
    },
    Icon:{
        position: 'absolute',
        top: 22,
        right: 22,

    }

})

export default InputImage;
import React from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputImage = ({ imageName, placeholder, onChangeText, value, secureTextEntry}) => {
    const [sec, setSec] = React.useState(secureTextEntry);
    return (
        <View >
            <TextInput  multiline={true}placeholder={placeholder} style={styles.Input} onChangeText={onChangeText} value={value} secureTextEntry={sec} />
            <Icon name={imageName} size={18} color="#3CB371" style={styles.Icon} />
            {secureTextEntry && (        
                <TouchableOpacity  style={styles.Icon2} onPress={() => setSec(!sec)}>
                    <Icon name={sec ? "eye" : "eye-slash"} size={18} color="#3CB371" />
                </TouchableOpacity>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    Input:{
        height: 150,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'#fff',
        width: 300,
        borderRadius:20,
        paddingRight:40,
        paddingLeft:40,
        textAlignVertical: 'top'
    },
    Icon:{
        position: 'absolute',
        top: 22,
        left: 22,
    },
    Icon2:{
        position: 'absolute',
        top:22,
        right:22
    }

})

export default InputImage;
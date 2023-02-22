import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, TextInput, Button } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('./assets/gaia.png')} style={styles.Image}></Image>
      <Text style={styles.Label}>GAIA</Text>
      <TextInput style={styles.Input} placeholder="Email" />
      <TextInput  style={styles.Input}placeholder="Senha" secureTextEntry />
      <Button style={styles.mario} title="Entrar" color="#2F4F4F" />
      <Text style={styles.Label1}>Não tem uma conta?</Text>
      <Button style={styles.Button} title="Cadastrar" color="#2F4F4F" />
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
  },
  mario:{
    margin: 10,
    color: '#3CB37',
    padding: 10,
  }
});

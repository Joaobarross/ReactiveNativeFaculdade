import React, {  useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import icon from  "../../assets/profile.jpg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native"




const Edit = () =>{
    const navigation = useNavigation();

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
      setInputValue(text);
    };
  
  
    const editItem = async () => {
        try {
          const value = await AsyncStorage.getItem('username');
          if (value !== null) {
            
            const novoValor = inputValue;
    
            await AsyncStorage.setItem('username', novoValor);
            console.log('Item editado com sucesso!');
            navigation.navigate("Home");
          } else {
            console.log('O item não existe no armazenamento local.');
          }
        } catch (error) {
          console.log('Erro ao editar o item:', error);
        }
      };

   
    return(
        <View>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.container}>
                <TouchableOpacity>
                    <Image source={icon} style={styles.icon}/>
                </TouchableOpacity>
                <Text style={styles.text}>Nome</Text>
                <TextInput style={styles.input} value={inputValue} onChangeText={handleInputChange}/>
                <Text style={styles.text}>Bio</Text>
                <TextInput style={styles.input}/>

                <TouchableOpacity style={styles.button} onPress={editItem}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 100,
    },
    icon: {
        width: 125,
        height: 125,
        borderRadius: 200,
        alignSelf: "center",
        marginBottom: 20
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold"
    },
    input:{
        backgroundColor: "#a6a6a6",
        padding: 10,
        marginTop: 20,
        fontSize: 18,
        borderRadius: 8,
        width: "80%",
        alignSelf:"center",
        fontWeight: "bold",
        borderWidth: 2,
    },
    button:{
        padding: 10,
        backgroundColor: "#262626",
        width: 150,
        borderRadius: 8,
        marginTop: 40,
        alignSelf: "center"
    },
    buttonText:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
})
export default Edit;
import React, {useState} from "react";

import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import * as Animatable from "react-native-animatable";
import userFoto from "../../assets/UserFoto.png";
import {useNavigation} from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";

const Cadastro = ( ) =>{

    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const isValid = () => {
      if (username && password && email && confirmPassword) {
        return true;
      }
     
      return false;
    };
  
    const handleSignIn = () => {
      if (isValid()) {
        AsyncStorage.setItem("username", username).then(() => {
          console.log(username);
          navigation.navigate("Home");
        });
      } else {
        console.log("Preencha todos os campos!");
      }
    };

    
  
    return(
        <View>
            <Animatable.View animation="fadeInUp" delay={500} style={styles.container}>
                <Image source={userFoto} style={styles.image}/>
                
                <Text style={styles.title}>Cadastro</Text>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" delay={1000} >
                <View>
                    <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => setUsername(text)}/>
                    <Icon name="account-circle" size={20} color="#000" style={styles.icon} />
                </View>
                <View>
                    <TextInput style={styles.input} placeholder="Email"  onChangeText={(text) => setEmail(text)}/>
                    <Icon name="account-circle" size={20} color="#000" style={styles.icon} />
                </View>
                <View>
                    <TextInput style={styles.input} placeholder="Password" onChangeText={(text) => setPassword(text)}/>
                    <Icon name="lock" size={20} color="#000" style={styles.icon} />
                </View>
                <View>
                    <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={(text) => setConfirmPassword(text)}/>
                    <Icon name="lock" size={20} color="#000" style={styles.icon} />
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonSingUp} onPress={handleSignIn}>
                        <Text style={styles.buttonSingUpText}>Sing Up</Text>
                    </TouchableOpacity>
                </View>
                
                
            </Animatable.View>
           
        </View>
    )
}

const styles =  StyleSheet.create({
    container:{
        
        alignSelf: "center"
    },
    image:{
        width: 150,
        height: 150,
        marginTop: 50,
        marginBottom: 10

    },
    title:{
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center",
        marginBottom: 10
        
    },
    input:{
        width:"80%",
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#a6a6a6",
        borderRadius: 8,
        color: "#0D0D0D",
        alignSelf: "center",
        borderWidth: 2,
        paddingStart: 30

    },
    icon:{
        position: "absolute",
        paddingTop: 25,
        paddingLeft: 50
    },
    
    buttonSingUp:{
        padding: 10,
        borderWidth: 2,
        width: "60%",
        borderRadius: 8,
        marginTop: 40,
        alignSelf: "center",
        
        
    },
    buttonSingUpText:{
        
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
   
})
export default Cadastro;
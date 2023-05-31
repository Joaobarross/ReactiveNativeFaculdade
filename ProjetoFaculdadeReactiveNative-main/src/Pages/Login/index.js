import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/MaterialIcons";
import gogleIcon from "../../assets/gogle.png";
import Logo from "../../assets/Logo.png";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isValid = () => {
    if (username && password) {
      
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

  return (
    <View>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.container}>
        <Image source={Logo} style={styles.image} />
        <Text style={styles.title}>Shart80s</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1000}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <Icon name="account-circle" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
        <Icon name="lock" size={20} color="#000" style={styles.iconPass} />

        <TouchableOpacity>
          <Text style={styles.esqueciASenha}>Esqueci a senha</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.buttonSingIn} onPress={handleSignIn}>
            <Text style={styles.buttonSingInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSingUp} onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.buttonSingUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonGoogle} onPress={handleSignIn}>
          <Image source={gogleIcon} style={{ width: 30, height: 30, position: "absolute", marginTop: 4, marginLeft: 45 }} />
          <Text style={styles.buttonGoogleText}>Entrar Com Sua Conta Google</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};


const styles =  StyleSheet.create({
    container:{
        
        alignSelf: "center"
    },
    image:{
        width: 300,
        height: 300,

    },
    title:{
        fontSize: 40,
        fontWeight: "bold",
        alignSelf: "center",
        position: "absolute",
        marginTop: 250
    },
    icon:{
        marginLeft: 50,
        paddingTop: 25,
        position: "absolute",
         
    },
    iconPass:{
        marginLeft: 50,
        paddingTop: 95,
        position: "absolute",
         
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
        paddingLeft: 30
        

    },
    esqueciASenha:{
        alignSelf: "flex-end",
        marginRight: 45,
        fontSize: 15,
        fontWeight: "bold"
    },
    buttonSingIn:{
        padding: 10,
        backgroundColor: "#262626",
        width: 150,
        borderRadius: 8,
        marginTop: 40,
        marginLeft: 45,
        position: "absolute"
        
    },
    buttonSingInText:{
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
        
    },
    buttonSingUp:{
        padding: 10,
        borderWidth: 2,
        width: 150,
        borderRadius: 8,
        marginTop: 40,
        alignSelf: "flex-end",
        marginRight: 40
        
    },
    buttonSingUpText:{
        
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonGoogle:{
        width:"80%",
        backgroundColor:"#1590ff",
        alignSelf: "center",
        padding: 10,
        marginTop: 20,
        borderRadius: 8
    },
    buttonGoogleText:{
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 20,
        textAlign: "center"
        
    }
})
export default Login;
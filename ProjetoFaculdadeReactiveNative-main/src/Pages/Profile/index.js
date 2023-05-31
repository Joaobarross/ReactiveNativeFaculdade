import React, {useState, useEffect} from "react";
import * as Animatable from "react-native-animatable";
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import profile from "../../assets/profile.jpg"
import arrow from "../../assets/left-arrow.png"
import {useNavigation} from "@react-navigation/native"
import { CarregaPoster } from "../../services/carregaServicos";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from "react-native-vector-icons/MaterialIcons";

const Item = ({image}) =>(
    <View>
        <Image source={image}  style={styles.imageProfileList01}/>
    </View>
)

const Profile = () =>{
    
    const [username, setUsername] = useState('');
    const [poster01, setPoster01] = useState('')

    useEffect(() => {
        const poster = CarregaPoster();
        setPoster01(poster.listaProfile01)

        const getUserName = async () => {
            try {
              const value = await AsyncStorage.getItem('username');
              if (value !== null) {
                setUsername(value);
              }
            } catch (error) {
              console.log('Erro ao obter o nome de usuário:', error);
            }
          };
      
          getUserName(); 
    }, [])
    const navigation = useNavigation();
   

    return(
        <View >
            <View>
                <View style={styles.arrowDown}>
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Image source={arrow} style={styles.arrow} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editIcon} onPress={() => navigation.navigate("Edit")}>
                        <Icon name="edit" size={30} color="#000" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Animatable.View animation="fadeInUp" delay={200}>
                <Image source={profile} style={styles.profileIcon}/>
                <View>
                    <Text style={styles.profileText}>{username}</Text>
                </View>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={200}>
                <Text style={styles.title}>Galery</Text>
                <ScrollView  
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={false}
                    >
                    <FlatList
                    pagingEnabled
                    horizontal
                    data={poster01}
                    renderItem={({item}) => <Item 
                    image={item.image}/>}
                    keyExtractor={item => item.id}

                    />
                                
                </ScrollView>
            </Animatable.View>
        </View>
    )
    
}

const styles =  StyleSheet.create({
    arrowDown:{
        paddingBottom: 70,
    },
    arrow:{
        width: 50,
        height: 50,
        marginLeft: 20,
        alignSelf: "flex-start",
        position: "absolute",
    
    },
    profileIcon:{
        width: 200,
        height: 200,
        borderRadius: 150,
        alignSelf:"center",
        
    },
    profileText:{
        textAlign: "center",
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold"
    },
    editIcon: {
        position: "absolute",
        alignSelf: "flex-end",
        paddingTop: 15,
        paddingRight: 20
    },

    title:{
        alignSelf: "center",
        marginTop: 15,
        fontWeight: "bold",
        fontSize: 24
    },
    imageProfileList01:{
        marginTop: 20,
        width: 200,
        height: 300,
        marginHorizontal: 10,
        borderRadius: 8
    }
})
export default Profile;
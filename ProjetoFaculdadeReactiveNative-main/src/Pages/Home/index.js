import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from "react-native-animatable";
import menu from "../../assets/menu.png";
import user from "../../assets/UserFoto.png";
import star from "../../assets/star.png";
import { CarregaPoster } from "../../services/carregaServicos";

const Item = ({ image, username, descricao, userfoto }) => {
  const adicionarAoArray = async (item) => {
    try {
      const arrayExistente = await AsyncStorage.getItem('arrayItens');
      const novoArray = arrayExistente ? JSON.parse(arrayExistente) : [];
      novoArray.push(item);
      await AsyncStorage.setItem('arrayItens', JSON.stringify(novoArray));
      Alert.alert("Adicionado Aos Favoritos")
      console.log('Item adicionado ao array!');
    } catch (error) {
      console.log('Erro ao adicionar item ao array:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity>
        <Image source={userfoto} style={styles.imageListAvatar} />
        <Text style={styles.textList}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => adicionarAoArray({ image, username, descricao, userfoto })}>
        <Image source={image} style={styles.imageList} />
      </TouchableOpacity>
      <Image source={star} style={styles.favoriteStar}/>
      <View>
        <Text style={styles.textDescricao}>{descricao}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const [poster, setPoster] = useState('');

  useEffect(() => {
    const poster = CarregaPoster();
    setPoster(poster.lista);
  }, []);

  const navigation = useNavigation();

  return (
    <View>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.headerView}>
        <TouchableOpacity>
          <Image source={menu} style={styles.menu} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Favoritos")}>
          <Image source={star} style={styles.star} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={user} style={styles.user} />
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={200}>
        <View style={styles.containerList}>
          <FlatList
            pagingEnabled
            data={poster}
            renderItem={({ item }) => (
              <Item
                userfoto={item.userfoto}
                username={item.username}
                image={item.image}
                descricao={item.descricao}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
    headerView:{
        padding: 10,
        paddingBottom: 70,
        borderBottomWidth: 1,
        
    },
    menu:{
        width: 70,
        height: 70,
        position:"absolute"

    },
    star:{
        position: "absolute",
        width: 50,
        height: 50,
        alignSelf: "flex-end",
        marginTop: 8,
        left: 280
    },
    favoriteStar:{
        width: 30,
        height: 30,
        position: "absolute",
        alignSelf: "flex-end",
        top: 360,
        left: 340
    },
    user:{
        marginTop: 10,
        marginRight: 10,
        width: 50,
        height: 50,
        alignSelf: "flex-end",
        position: "absolute"
    },

    containerList:{
        alignSelf: "center"
    },
    imageList: {
        width: 350,
        height: 350,
        borderRadius: 8,
        alignSelf: "center"
    },
    imageListAvatar: {
        marginLeft: 10,
        marginTop: 10,
        width: 30,
        height: 30,
        marginBottom: 10
        
    },
    textList:{
        position: "absolute",
        marginLeft: 45,
        marginTop: 13,
        fontSize: 16,
        fontWeight: "bold",
        
    },
    textDescricao:{
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: "#A6A6A6",
        padding: 20,
        borderRadius: 8,
        fontSize: 16,
        fontWeight: "bold",
        width: "90%"
    },
    coracao: {
        width: 30,
        height: 30,
        alignSelf: "flex-end"
    }
})
export default Home;
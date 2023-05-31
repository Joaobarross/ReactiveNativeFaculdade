import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import arrow from "../../assets/left-arrow.png"
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Favoritos = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    const carregarItens = async () => {
      try {
        const arrayExistente = await AsyncStorage.getItem('arrayItens');
        if (arrayExistente) {
          const array = JSON.parse(arrayExistente);
          setItens(array);
        }
      } catch (error) {
        console.log('Erro ao carregar itens:', error);
      }
    };

    carregarItens();
  }, []);

  const deletarItem = async (index) => {
    try {
      const novoArray = [...itens];
      novoArray.splice(index, 1);
      setItens(novoArray);
      await AsyncStorage.setItem('arrayItens', JSON.stringify(novoArray));
      console.log('Item removido do array!');
    } catch (error) {
      console.log('Erro ao remover item do array:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => deletarItem(index)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Deletar</Text>
        </TouchableOpacity>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemUsername}>{item.username}</Text>
        <Text style={styles.itemDescricao}>{item.descricao}</Text>
    </View>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrow} style={styles.arrow}/>
        </TouchableOpacity>
        <Text style={styles.title}>
            Favoritos
        </Text>
        <View style={styles.border}>

        </View>
        <FlatList
            data={itens}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  arrow: {
    width: 70,
    height: 70,
    position: 'absolute',
  },
  title:{
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20
  },
  border:{
    borderBottomWidth: 1,
  },
  itemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    marginRight: 12,
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  itemUsername: {
    fontWeight: 'bold',
    marginRight: 12,
  },
  itemDescricao: {
    flex: 1,
  },
});

export default Favoritos;

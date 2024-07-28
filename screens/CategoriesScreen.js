import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import { AntDesign } from "@expo/vector-icons";

const CategoryScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const db = firebase.firestore();
    const categoriesRef = db.collection('categories'); // Replace with your collection name

    try {
      const snapshot = await categoriesRef.get();
      const categoriesData = snapshot.docs.map((doc) => doc.data());

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryPress = (category) => {
    // Navigate to the next screen and pass the selected category as a parameter
    navigation.navigate('Quiz', { selectedCategory: category });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleCategoryPress(item.name)}>
        <Text style={styles.itemText}>{item.difficulty}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>        
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                }}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Home")} />
                <Image source={require('../assets/sampleheader.png')} style={styles.image} />
                <AntDesign name="closeoutlined" size={24} color="black"/>
            </View>
        <View style={{ marginTop: 15 }}>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.name}
                renderItem={renderItem}
                numColumns={2}/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#63812F',
      },  
      image: {
        height: 45,
        width: 75,
        alignSelf: "center",
        backgroundColor:"black"
      },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#63812F',
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 8,
        margin: 15,
        padding: 10,
        minHeight: 120,
    },
    itemText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
});

export default CategoryScreen;
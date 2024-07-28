import { StyleSheet, SafeAreaView, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <View style={{ marginTop: 15 }}>      
      <Image source={require('../assets/sampleheader.png')} style={styles.image} />

      <View style={{ padding: 10 }}>

        <View style={styles.descView}>
          <View style={styles.eachdescView}>
            <Text style={{ color: "white" }}>•</Text>
            <Text style={styles.textDesc}>
              Choose your difficulty.(1-10. 1 is the easiest.)
            </Text>
          </View>

          <View style={styles.eachdescView}>
            <Text style={{ color: "white" }}>•</Text>
            <Text style={styles.textDesc}>
              On each category you got 3 chances and 60 seconds.
            </Text>
          </View>

          <View style={styles.eachdescView}>
            <Text style={{ color: "white" }}>•</Text>
            <Text style={styles.textDesc}>
              Select the correct answer and win 5 seconds (If your answer is wrong you lose 1 chance)
            </Text>
          </View>

          <View style={styles.eachdescView}>
            <Text style={{ color: "white" }}>•</Text>
            <Text style={styles.textDesc}>
              Beat that category
            </Text>
          </View>
        </View>
      </View>

      <Pressable
      onPress={() => navigation.navigate("Categories")}
        style={styles.startBtn}>
        <Text style={{color:"#63812F",fontWeight:"600",textAlign:"center"}}>Start Quiz</Text>
      </Pressable>
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
    height: 200,
    width: 300,
    alignSelf: "center",
    backgroundColor:"black"
  },
  descView: { 
    padding: 10,
    backgroundColor: "#F88379",
    borderRadius: 6,
    marginTop: 15,
  },
  eachdescView:{
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  textDesc:{
    marginLeft: 4,
    color: "#722F37",
    fontSize: 15,
    fontWeight: "500",
  },
  startBtn: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    width:120,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
});

export default HomeScreen;


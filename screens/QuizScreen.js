import React, { useState, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, View, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { firebase } from '../config';
import { useRoute } from '@react-navigation/native';

const QuizScreen = () => {
    const route = useRoute();
    const selectedCategory = route.params?.selectedCategory;
    const navigation = useNavigation();
    const [players, setPlayers] = useState([]); // Declare players state variable
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Added state for selected answer
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [totalWrongAnswers, setTotalWrongAnswers] = useState(3);

    useEffect(() => {
        getPlayers();
    }, []);

    const getPlayers = async () => {
        const db = firebase.firestore();
        const playersRef = db.collection(selectedCategory);

        try {
            const snapshot = await playersRef.get();
            const playersData = snapshot.docs.map(doc => doc.data());
            setPlayers(playersData);
        } catch (error) {
            console.error("Error fetching players:", error);
        }
    }

    const handleAnswer = (selectedAnswer) => {
        if (answerStatus !== null) {
            // If the question is already answered, return and don't do anything
            return;
        }
    
        setSelectedAnswer(selectedAnswer);
    
        const currentQuestion = players[currentQuestionIndex];
        const correctAnswer = currentQuestion.correctAnswer;
    
        const isCorrect = selectedAnswer === correctAnswer;
        setAnswerStatus(isCorrect ? "correct" : "wrong");
        setShowPopup(true);
    
        // Automatically close the popup after 2 seconds
        setTimeout(() => {
            setShowPopup(false);
            setAnswerStatus(null);
            setSelectedAnswer(null); // Reset selected answer state
    
            // If the answer is correct, move to the next question
            if (isCorrect) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setWrongAnswers([]);
            } else {
                // If the answer is wrong, add it to the wrongAnswers array
                setWrongAnswers((prevWrongAnswers) => [...prevWrongAnswers, selectedAnswer]);
                setTotalWrongAnswers((prevIndex) => prevIndex - 1);
            }
        }, 2000);
    };

    const renderPopup = () => {
        if (!showPopup) return null;

        return (
            <Modal animationType="fade" transparent={true} visible={showPopup}>
                <View style={styles.popupContainer}>
                    <Text style={styles.popupText}>
                        {answerStatus === "correct" ? "Correct!" : "Wrong!"}
                    </Text>
                </View>
            </Modal>
        );
    };

    const renderItem = ({ item }) => {
        const isAnswered = answerStatus !== null;
        const isCorrect = item === players[currentQuestionIndex].correctAnswer;
        const isSelected = selectedAnswer === item;
        console.log(wrongAnswers);

        let touchStyle = styles.answersTouch;
        let textStyle = styles.answersTxt;

        if (isAnswered) {
            console.log("aaaa4");
            console.log("isselected="+isSelected)
            console.log(!isCorrect)
            // If the question is answered, handle background color based on the answer
            if (isSelected && !isCorrect) {
                console.log("aaaa");
                touchStyle = [styles.answersTouch, styles.wrongAnswer];
                textStyle = [styles.answersTxt, styles.wrongAnswerText];
            } else if (isSelected && isCorrect) {
                touchStyle = [styles.answersTouch, styles.correctAnswer];
                textStyle = [styles.answersTxt, styles.correctAnswerText];
            }
            else if (wrongAnswers.includes(item)){                
                touchStyle = [styles.answersTouch, styles.wrongAnswer];
                textStyle = [styles.answersTxt, styles.wrongAnswerText];
            }
        } else {
            // If the question is not answered yet, handle background color based on selected option
            if (isSelected) {
                touchStyle = [styles.answersTouch, styles.selectedAnswer];
            }
            else if (wrongAnswers.includes(item)){                
                touchStyle = [styles.answersTouch, styles.wrongAnswer];
                textStyle = [styles.answersTxt, styles.wrongAnswerText];
            }
        }

        //BURDA KALDIN. SEÇENEK YANLIŞSA ITEM'DE DISABLED OLACAK. RENGİ ÇÖZDÜK

        return (
            <TouchableOpacity
                style={touchStyle}
                onPress={() => handleAnswer(item)}
                disabled={isAnswered}
            >
                <Text style={textStyle}>{item}</Text>
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
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate("Categories")} />
                <Image source={require('../assets/sampleheader.png')} style={styles.image} />
                <AntDesign name="arrowright" size={24} color="black" onPress={() => navigation.navigate("Categories")} />
            </View>
            {players.length > 0 && currentQuestionIndex < players.length ? (
                <View>
                <Text style={styles.categoryTxt}>Difficulty: {players[currentQuestionIndex].difficulty}</Text>
                    <View style={{ alignItems: "center" }}>
                        <Image source={{ uri: players[currentQuestionIndex].photo }} style={styles.playerphoto} />
                    </View>
                    <Text style={styles.categoryTxt}>Who is this player?</Text>
                    <FlatList
                        data={players[currentQuestionIndex].options}
                        keyExtractor={(option, index) => index.toString()}
                        renderItem={renderItem}
                    />
                </View>
            ) : (
                <Text style={styles.quizEndText}>Quiz Ended</Text>
            )}
            {renderPopup()}
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
        backgroundColor: "black"
    },
    playerphoto: {
        height: 240,
        width: 160,
    },
    answersTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#63812F',
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 15,
        margin: 15,
        padding: 10,
        minHeight: 60,
    },
    answersTxt: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryTxt: {
        margin: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center"
    },
    popupContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    popupText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    quizEndText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
    },
    wrongAnswer: {
        backgroundColor: 'red',
    },
    wrongAnswerText: {
        color: 'white',
    },
    correctAnswer: {
        backgroundColor: 'green',
    },
    correctAnswerText: {
        color: 'white',
    },
    selectedAnswer: {
        backgroundColor: 'blue',
    },
});

export default QuizScreen;

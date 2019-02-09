import React, { Component, Fragment } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

import { white, grey, blue, green, red, black, lightBlue } from '../utils/colors';
import TextHeading from './TextHeading';
import ButtonText from './ButtonText';

const ANSWER_CORRECT = 'ANSWER_CORRECT';
const ANSWER_INCORRECT = 'ANSWER_INCORRECT';

export default class ViewQuiz extends Component {
    state = {
        currentCardIndex: 0,
        answeredCount: 0,
        correctCount: 0,
        isShowingAnswer: false,
    }

    handleAnswerSubmit = (answer) => {
        const quizLength = this.props.navigation.state.params.deck.cards.length;
        this.setState((state) => ({
            ...state,
            isShowingAnswer: false,
            currentCardIndex: state.currentCardIndex < quizLength ? ++state.currentCardIndex : state.currentCardIndex,
            answeredCount: ++state.answeredCount,
            correctCount: answer === ANSWER_CORRECT ? ++state.correctCount : state.correctCount
        }));
    }

    handleRestartQuiz = () => {
        this.setState({
            currentCardIndex: 0,
            answeredCount: 0,
            correctCount: 0,
            isShowingAnswer: false,
        });
    }

    render() {
        const { navigation } = this.props;
        const { deck } = this.props.navigation.state.params;
        const { currentCardIndex, answeredCount, isShowingAnswer, correctCount } = this.state;
        const quizLength = deck.cards.length;
        const score = Math.round(correctCount / answeredCount * 100);

        return (
            <View style={styles.container}>
                {quizLength === answeredCount
                    ? (
                        <Fragment>
                            <View style={styles.completeContainer}>
                                <TextHeading>QUIZ COMPLETE</TextHeading>
                                <Text style={styles.completeBodyText}>You got</Text>
                                <Text style={styles.score}>{`${score}%`}</Text>
                            </View>
                            <View style={styles.buttons}>
                                <ButtonText
                                    onPress={this.handleRestartQuiz}
                                    icon={(<MaterialCommunityIcons name='restart' color={white} size={25} />)}
                                >Restart Quiz</ButtonText>
                                <ButtonText
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                    icon={(<MaterialIcons name='arrow-back' color={white} size={25} />)}
                                >Back to Deck</ButtonText>
                            </View>
                        </Fragment>
                    )
                    : (
                        <Fragment>
                            <View style={styles.questionContainer}>
                                <Text style={styles.cardCounter}>{`${answeredCount + 1} of ${deck.cards.length}`}</Text>
                                <TextHeading>{deck.cards[currentCardIndex].question}</TextHeading>
                                {isShowingAnswer && (
                                    <View style={styles.answerContainer}>
                                        <Text style={styles.answerLabel}>Answer:</Text>
                                        <Text style={styles.answer}>{deck.cards[currentCardIndex].answer}</Text>
                                    </View>

                                )}
                            </View>
                            <View style={styles.buttons}>
                                {!isShowingAnswer
                                    ? (
                                        <ButtonText
                                            onPress={() => {
                                                this.setState({
                                                    isShowingAnswer: true
                                                })
                                            }}
                                            buttonStyle={{ alignSelf: 'center' }}
                                            icon={(<Foundation name='checkbox' color={white} size={25} />)}
                                        >CHECK ANSWER</ButtonText>
                                    )
                                    : (
                                        <View style={styles.gradingButtonsContainer}>
                                            <ButtonText
                                                onPress={() => {
                                                    this.handleAnswerSubmit(ANSWER_CORRECT);
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: green,
                                                    marginRight: 20,
                                                    paddingLeft: 15,
                                                    paddingRight: 15
                                                }}
                                                style={{
                                                    fontSize: 20
                                                }}
                                            >CORRECT</ButtonText>
                                            <ButtonText
                                                onPress={() => {
                                                    this.handleAnswerSubmit(ANSWER_INCORRECT);
                                                }}
                                                buttonStyle={{
                                                    backgroundColor: red,
                                                    paddingLeft: 15,
                                                    paddingRight: 15
                                                }}
                                                style={{
                                                    fontSize: 20
                                                }}
                                            >INCORRECT</ButtonText>
                                        </View>
                                    )}
                            </View>
                        </Fragment>
                    )
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between',
        paddingTop: 100
    },
    questionContainer: {
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    cardCounter: {
        color: grey,
        fontSize: 16
    },
    buttons: {
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    answerContainer: {
        backgroundColor: lightBlue,
        alignSelf: 'stretch',
        borderColor: blue,
        borderWidth: 1,
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 40
    },
    answerLabel: {
        fontSize: 12,
        alignSelf: 'flex-start',
        color: grey,
        marginBottom: 20,
    },
    answer: {
        color: blue,
        fontSize: 20,
        textAlign: 'center'
    },
    gradingButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    completeContainer: {
        alignItems: 'center',
    },
    completeBodyText: {
        color: grey,
        fontSize: 20,
    },
    score: {
        color: black,
        fontSize: 100
    },
});

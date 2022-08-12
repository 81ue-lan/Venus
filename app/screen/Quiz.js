import React, { useState } from 'react'
import { View, Text, SafeAreaView,Navigator, StatusBar, Image, TouchableOpacity, Modal, Animated ,Button} from 'react-native'
import { COLORS, SIZES } from '../constants';
import data from '../data/QuizData';


const Quiz = ({navigation}) => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    

    const validateAnswer = (selectedOption) => {
        setCurrentOptionSelected(selectedOption);
        if(selectedOption==allQuestions[currentQuestionIndex]?.options[0]){
            // Set Score
            const score=((score)=>score+1);
            console.log(score);
            setScore(score)
        }
        else if(selectedOption==allQuestions[currentQuestionIndex]?.options[1]){
            // Set Score
            const score=((score)=>score+2);
            console.log(score);
            setScore(score)
        }
        else if(selectedOption==allQuestions[currentQuestionIndex]?.options[2]){
            // Set Score
            const score=((score)=>score+3);
            console.log(score);
            setScore(score)
        }
        else{
            // Set Score
            const score=((score)=>score+4);
            console.log(score);
            setScore(score)
        }
        // Show Next Button
        setShowNextButton(true)
    }
    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.primary, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.primary, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.black,
                    fontSize: 30
                }}>{allQuestions[currentQuestionIndex]?.question}</Text>
            </View>
        )
    }
    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity 
                        onPress={()=> validateAnswer(option)}
                        key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==currentOptionSelected ? COLORS.success : COLORS.secondary+'80',
                            backgroundColor: option==currentOptionSelected ? COLORS.success +'20': COLORS.secondary+'60',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.black}}>{option}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity
                onPress={handleNext}
                style={{
                    marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 20
                }}>
                    <Text style={{fontSize: 20, color: COLORS.black, textAlign: 'center'}}>下一題</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }
    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.accent
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }
    const renderShowImage = () => {
        if (score<11){
            return(
            <><Image style={{ padding: 20, }}
                    source={require('../screen/assets/Dry.png')}
                    resizeMode={'contain'} />
                    <Text style={{ fontSize: 23}}>{'乾性肌膚'}</Text></>
            )
        }
        else if(score>10 && score<15){
            return(
            <><Image style={{ padding: 20, }}
                    source={require('../screen/assets/Neutral.png')}
                    resizeMode={'contain'} />
                    <Text style={{ fontSize: 23 }}>{'中性肌膚'}</Text></>)
        }
        else if(score>14 && score<21){
            return(
            <><Image style={{ padding: 20, }}
                    source={require('../screen/assets/Combination.png')}
                    resizeMode={'contain'} />
                    <Text style={{ fontSize: 23 }}>{'混合性肌膚'}</Text></>)
        }
        else{
            return(<><Image style={{ padding: 20, }}
                source={require('../screen/assets/Oily.png')}
                resizeMode={'contain'} />
                <Text style={{ fontSize: 23 }}>{'油性肌膚'}</Text></>)
        }
            
    }

    return (
       <SafeAreaView style={{
           flex: 1
       }}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               backgroundColor: COLORS.white,
               position:'relative'
           }}>

               {/* ProgressBar */}
               { renderProgressBar() }

               {/* Question */}
               {renderQuestion()}

               {/* Options */}
               {renderOptions()}

               {/* Next Button */}
               {renderNextButton()}

               {/* Score Modal */}
               <Modal
               animationType="slide"
               transparent={true}
               visible={showScoreModal}
               >
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.secondary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{'檢測結果'}</Text>
                           {renderShowImage()}
                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 20,
                                   color: COLORS.black
                               }}>{score}/{25}</Text>
                           </View>
                           {/* next Step button */}
                           <TouchableOpacity 
                           onPress={() => navigation.navigate('TabNavigator')}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 100
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.black, fontSize: 20
                               }}>下一步</Text>
                               </TouchableOpacity>
                       </View>
                   </View>
               </Modal>
               {/* Background Image */}
               <Image
                source={require('../screen/assets/DottedBG.png')}
                style={{
                    width: SIZES.width,
                    height: 130,
                    zIndex: -1,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: 0.5
                }}
                resizeMode={'contain'}
                />
           </View>
       </SafeAreaView>
    )
}

export default Quiz
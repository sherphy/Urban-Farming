import {db} from "../util/firebase";
import { useEffect, useState } from "react";
import { documentId, getDocs } from "firebase/firestore";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import { CollectionsBookmarkRounded } from "@mui/icons-material";

//if wrong answer then try again message
const Quiz = () => {
    const questionsCollectionRef = collection(db, "Questions");
    const [questionSets, setQuestionSets]=useState([]);
    const [correctAnswer, setCorrectDisplay]=useState('');
    //wrong is always Try again
    //correct is must manual set in database

    const getQuestionSets = async () => {
        const data = await getDocs(questionsCollectionRef);
        setQuestionSets(data.docs.map((doc) => ({...doc.data()})));
    }

    getQuestionSets();

    useEffect(()=>{
        db.collection('Questions').doc("1").get().then(snapshot=>{
            setCorrectDisplay(snapshot.data().Answer);
        })
    })

    // // const evaluateIsCorrect = () => {
    // // let acceptingAnswers = true;
    // // document.addEventListener('click', (e) => {
    // //     if (!acceptingAnswers) return;
    // //     acceptingAnswers = false;
    // //     const selectedChoice = e.target;
    // //     // const selectedAnswer = selectedChoice.dataset["number"];
    // //     console.log(selectedChoice);

    // //     const isCorrect =
    // //         selectedAnswer === document.Answer ? 'correct' : 'incorrect';

    // //     if (isCorrect === 'correct') {
    // //         console.log("correct");
    // //         // incrementScore(CORRECT_BONUS);
    // //     }
    // // });

    // const getQuizById = currentQuizId => {
    //     return db.collection('Quizzes').doc(currentQuizId).get();
    // };

    // const getQuestionsByQuizId = currentQuizId => {
    //     return db.collection('Questions')
    //       .orderBy("ID", "asc")
    //       .doc(currentQuizId)
    //       .collection()
    //       .get();
    //   };

    //   const getQuizAndQuestionDetails = async () => {
    //     // Get Quiz
    //     let currentQuiz = await getQuizById(currentQuizId);
    //     currentQuiz = currentQuiz.data();
    //     setTitle(currentQuiz.title);

    //      const currentQuestionsForSet = await getQuestionsByQuizId(questionsCollectionRef);

    //     useEffect(() => {
    //         getQuizAndQuestionDetails();
    //     }, []);

    //   }
    
    // const getQuestionsByQuizId = currentQuizId => {
    //     return db.collection('Questions').doc(currentQuizId).get();
    // }

    // const [selectedNumber, setSelectedNumber] = useState(0);

    // const selectNumber = numberSelected => {
    //      setSelectedNumber(numberSelected)
    // }

    // selectNumber();
    // console.log(selectedNumber);

    const handleInput = (e) => {
        const buttonValue = e.target.value;
        console.log(buttonValue);
    }
    // const isCorrect = () => {
    //     if (handleInput() === correctAnswer) {
    //         console.log("isCorrect");
    //     }
    // }
    // isCorrect();

    // isCorrect();

    // const GetDatabase = () => {
    //     const [tasks, setTasks] = useState([])

    //     useEffect(() => {
    //         const q = query(collection(db, 'tasks'), orderBy('ID', 'asc'))
    //         onSnapshot(q, (querySnapshot) => {
    //           setTasks(querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ans: doc.answer
    //           })))
    //         })
    //       },[])
    // }

    // const getAnswer = async () => {
    //     const correctAnswer = await db.collection('Products').orderBy("price", "asc").get();
    //     for (var snap of correctAnswer.docs) {
    //         var data = snap.data();
    //         data.ID = snap.id;
    //         data.Answer = snap.Answer;
    //         console.log(data.Answer);
    //     }
    // }

    // const GetAnswer = () => {
    //     const [rightAnswer, setRightAnswer]=useState('');
    //     db.collection('Questions').orderBy("ID","asc").doc("BZ9VFhg548X81O01UB7E").get().then(snapshot=>{
    //         setRightAnswer(snapshot.data().Answer);
    //     })
    // }

    // GetAnswer();

    // db.collection("Questions").get().then((querySnapshot) => {
    //     var data = getDocs();
    //     var id = data.id();
    //     var answer = data.answer();
    //     console.log(id);
    //     console.log(answer);
    // })
    // questionSets.map((Questions) => {

    // })

    return (
        <div className="Quiz">
            <h1> Daily quiz to earn rewards! </h1>
            {questionSets.map((Questions) => {
                return (
                    <div>
                        <h1>Title: {Questions.Title}</h1>
                        <button value="1" onClick={handleInput}>Option 1: {Questions.Option1}</button>
                        <br/>
                        <button value="2" onClick={handleInput}>Option 2: {Questions.Option2}</button>
                        <br/>
                        <button value="3" onClick={handleInput}>Option 3: {Questions.Option3}</button>
                        <br/>
                        <button value="4" onClick={handleInput}>Option 4: {Questions.Option4}</button>
                        <br/>        
                            <div>
                                {/* {Questions.Answer === {handleInput} &&
                                console.log("correct")} */}
                            </div>           
                    </div>
                );
            })}
        </div>
)

}

export default Quiz;


// // const Quiz = () => {
// //     const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);

// //     const getQuizAndQuestionDetails = async () => {
// //         // Get Quiz
// //         const getQuestionsByQuizId = currentQuizId => {
// //             return db.collection("Questions")
// //                 .doc(currentQuizId)
// //                 .collection()
// //                 .get();
// //         }

// //         const getQuizById = currentQuizId => {
// //             return db.collection('Questions').doc(currentQuizId).get();
// //         };
// //         let currentQuiz = await getQuizById(currentQuizId);
// //         currentQuiz = currentQuiz.data();
// //         setTitle(currentQuiz.title);

// //         // Get Questions for current quiz
// //         const questions = await getQuestionsByQuizId(currentQuizId);

// //         // Transform and shuffle options
// //         let tempQuestions = [];
// //         await questions.docs.forEach(async res => {
// //             let question = res.data();

// //             // Create Single array of all options and shuffle it
// //             question.allOptions = shuffleArray([
// //                 ...question.incorrect_answers,
// //                 question.correct_answer,
// //             ]);
// //             await tempQuestions.push(question);
// //         });

// //         setQuestions([...tempQuestions]);
// //     };

// //     useEffect(() => {
// //         getQuizAndQuestionDetails();
// //     }, []);

// //     return (
// //         <div>
// //             {item.allOptions.map((option, optionIndex) => {
// //                 return (
// //                     <TouchableOpacity
// //                         key={optionIndex}
// //                         style={{
// //                             paddingVertical: 14,
// //                             paddingHorizontal: 20,
// //                             borderTopWidth: 1,
// //                             borderColor: COLORS.border,
// //                             backgroundColor: getOptionBgColor(item, option),
// //                             flexDirection: 'row',
// //                             alignItems: 'center',
// //                             justifyContent: 'flex-start',
// //                         }}
// //                         onPress={() => {
// //                             if (item.selectedOption) {
// //                                 return null;
// //                             }
// //                             // Increase correct/incorrect count
// //                             if (option == item.correct_answer) {
// //                                 setCorrectCount(correctCount + 1);
// //                             } else {
// //                                 setIncorrectCount(incorrectCount + 1);
// //                             }
// //                         }}>
// //                     </TouchableOpacity>
// //                 )})}
// //         </div>
// //     );
// // }

// // const Quiz = () => {

// // }
// // export default Quiz;

// import React, {useState, useEffect} from 'react';
// import {COLORS} from "../components/colors";
// import View from "react";
// import Text from "react";
// import {db} from "../util/firebase"

// const PlayQuizScreen = ({navigation, route}) => {
//   const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
//   const [title, setTitle] = useState('');
//   const [questions, setQuestions] = useState([]);

//   const [correctCount, setCorrectCount] = useState(0);
//   const [incorrectCount, setIncorrectCount] = useState(0);
//   const [isResultModalVisible, setIsResultModalVisible] = useState(false);

//   const shuffleArray = array => {
//     for (let i = array.length - 1; i > 0; i--) {
//       // Generate random number
//       let j = Math.floor(Math.random() * (i + 1));

//       let temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//     }
//     return array;
//   };

//   const getQuizAndQuestionDetails = async () => {
//     // Get Quiz
//     const getQuizById = currentQuizId => {
//         return db.collection('Questions').doc("1").get();
//       };
//     let currentQuiz = await getQuizById(currentQuizId);

//     currentQuiz = currentQuiz.data();
//     setTitle(currentQuiz.title);

//     // Get Questions for current quiz
//     const getQuestionsByQuizId = currentQuizId => {
//         return db.collection('Questions')
//           .doc(currentQuizId)
//           .collection('QNA')
//           .get();
//       };

//     const questions = await getQuestionsByQuizId(currentQuizId);

//     // Transform and shuffle options
//     let tempQuestions = [];
//     await questions.docs.forEach(async res => {
//       let question = res.data();

//       // Create Single array of all options and shuffle it
//       question.allOptions = shuffleArray([
//         ...question.incorrect_answers,
//         question.correct_answer,
//       ]);
//       await tempQuestions.push(question);
//     });

//     setQuestions([...tempQuestions]);
//   };

//   useEffect(() => {
//     getQuizAndQuestionDetails();
//   }, []);

//   const getOptionBgColor = (currentQuestion, currentOption) => {
//     if (currentQuestion.selectedOption) {
//       if (currentOption === currentQuestion.selectedOption) {
//         if (currentOption === currentQuestion.correct_answer) {
//           return COLORS.success;
//         } else {
//           return COLORS.error;
//         }
//       } else {
//         return COLORS.white;
//       }
//     } else {
//       return COLORS.white;
//     }
//   };

//   const getOptionTextColor = (currentQuestion, currentOption) => {
//     if (currentQuestion.selectedOption) {
//       if (currentOption === currentQuestion.selectedOption) {
//         return COLORS.white;
//       } else {
//         return COLORS.black;
//       }
//     } else {
//       return COLORS.black;
//     }
//   };

//   return (
//       <div>
//       {/* Top Bar */}
//           <View
//             style={{
//               backgroundColor: COLORS.success,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 10,
//               paddingVertical: 4,
//               borderTopLeftRadius: 10,
//               borderBottomLeftRadius: 10,
//             }}>
//             {/* <MaterialIcons
//               name="check"
//               size={14}
//               style={{color: COLORS.white}}
//             /> */}
//             <Text style={{color: COLORS.white, marginLeft: 6}}>
//               {correctCount}
//             </Text>
//           </View>

//           {/* Incorrect */}
//           <View
//             style={{
//               backgroundColor: COLORS.error,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'center',
//               paddingHorizontal: 10,
//               paddingVertical: 4,
//               borderTopRightRadius: 10,
//               borderBottomRightRadius: 10,
//             }}>
//             {/* <MaterialIcons
//               name="close"
//               size={14}
//               style={{color: COLORS.white}}
//             /> */}
//             <Text style={{color: COLORS.white, marginLeft: 6}}>
//               {incorrectCount}
//             </Text>
//           </View>

//       {/* Questions and Options list */}
//       <div
//         data={questions}
//         style={{
//           flex: 1,
//           backgroundColor: COLORS.background,
//         }}
//         showsVerticalScrollIndicator={false}
//         keyExtractor={item => item.question}
//         renderItem={({item, index}) => (
//           <View
//             style={{
//               marginTop: 14,
//               marginHorizontal: 10,
//               backgroundColor: COLORS.white,
//               elevation: 2,
//               borderRadius: 2,
//             }}>
//             <View style={{padding: 20}}>
//               <Text style={{fontSize: 16}}>
//                 {index + 1}. {item.question}
//               </Text>
//             </View>
//             {/* Options */}
//             {item.allOptions.map((option, optionIndex) => {
//               return (
//                 <div>
//                   key={optionIndex}
//                   style={{
//                     paddingVertical: 14,
//                     paddingHorizontal: 20,
//                     borderTopWidth: 1,
//                     borderColor: COLORS.border,
//                     backgroundColor: getOptionBgColor(item, option),
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'flex-start',
//                   }}
//                   onPress={() => {
//                     if (item.selectedOption) {
//                       return null;
//                     }
//                     // Increase correct/incorrect count
//                     if (option == item.correct_answer) {
//                       setCorrectCount(correctCount + 1);
//                     } else {
//                       setIncorrectCount(incorrectCount + 1);
//                     }

//                     let tempQuestions = [...questions];
//                     tempQuestions[index].selectedOption = option;
//                     setQuestions([...tempQuestions]);
//                   }}>
//                   <Text
//                     style={{
//                       width: 25,
//                       height: 25,
//                       padding: 2,
//                       borderWidth: 1,
//                       borderColor: COLORS.border,
//                       textAlign: 'center',
//                       marginRight: 16,
//                       borderRadius: 25,
//                       color: getOptionTextColor(item, option),
//                     }}>
//                     {optionIndex + 1}
//                   </Text>
//                   <Text style={{color: getOptionTextColor(item, option)}}>
//                     {option}
//                   </Text>
//                 </div>
//               );
//             })}
//           </View>
//         )}
//         ListFooterComponent={() => (
//           <div
//             labelText="Submit"
//             style={{margin: 10}}
//             handleOnPress={() => {
//               // Show Result modal
//               setIsResultModalVisible(true);
//             }}
//           />
//         )}
//       />

//       {/* Result Modal */}
//       {/* <ResultModal
//         isModalVisible={isResultModalVisible}
//         correctCount={correctCount}
//         incorrectCount={incorrectCount}
//         totalCount={questions.length}
//         handleOnClose={() => {
//           setIsResultModalVisible(false);
//         }}
//         handleRetry={() => {
//           setCorrectCount(0);
//           setIncorrectCount(0);
//           getQuizAndQuestionDetails();
//           setIsResultModalVisible(false);
//         }}
//         handleHome={() => {
//           navigation.goBack();
//           setIsResultModalVisible(false);
//         }}
//       /> */}
//   );
//   </div>
//   )};

// export default PlayQuizScreen;
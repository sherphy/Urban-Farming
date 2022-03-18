import { db, auth, firebase } from "../util/firebase";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
toast.configure();

const Quiz = () => {
    const [questionSets, setQuestionSets] = useState([]);
    // const [currentQuestion, setCurrentQuestion] = useState([]);
    const [selectedAns, setSelectedAns] = useState("");
    const [correctAnswer, setCorrectDisplay] = useState("");
    const [wrongAns, setWrongAns] = useState(false);
    const [questionAlreadyAttempted, setQuestionAlreadyAttempted] =
      useState(false);

      //right now i have 16 questions 
      //but when i change the questions then change the date 
      const question =
      questionSets[
        new Date().getDate() > 16
          ? new Date().getDate() - 16
          : new Date().getDate()
      ];

      console.log(question);

      //getting the questions
      useEffect(() => {
        db.collection("Questions")
          .orderBy("ID")
          .onSnapshot((snapshot) => {
            let questionSets = snapshot.docs.map((doc) => {
              return { id: doc.id, ...doc.data() };
            });
            setQuestionSets(questionSets);
          });
      }, []);

      //correct or wrong
      function correctAnswerHandle() {
        if (question && question.Answer === selectedAns) {
          setCorrectDisplay(true);
          return;
        }
        setWrongAns(true);
      }
      
      //let them know it is correct
      //and hide the question so they cant attempt again today
      //increase point 
      useEffect(() => {
        if (correctAnswer) {
          setWrongAns(false);
          increasePoint();
          makeInvisibleAlreadyAnswered();
        }
      }, [correctAnswer]);
    
      useEffect(() => {
        if (question) {
          if (question?.answeredIds.includes(auth.currentUser.uid)) {
            setQuestionAlreadyAttempted(true);
          }
        }
      }, [question]);

      //5 points for correct answer
      function increasePoint() {
        db.collection("SignedUpUsersData")
          .doc(auth.currentUser.uid)
          .update({
            Points: firebase.firestore.FieldValue.increment(5),
          })
          .then(() => {
            // alert("5 Points added");
            toast.success('Correct! 5 points have been added', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
          });
      }

      function makeInvisibleAlreadyAnswered() {
        db.collection("Questions")
          .doc(question.id)
          .update({
            answeredIds: firebase.firestore.FieldValue.arrayUnion(
              auth.currentUser.uid
            ),
          })
        //   .then(() => {
        //     alert(
        //       "You've completed today's quiz, come back again tomorrow!"
        //     );
        //   });
      }

      function tryAgain() {
        setCorrectDisplay(false);
        setSelectedAns("");
        setWrongAns(false);
      }

      return (
        <div className="Quiz">
          {questionAlreadyAttempted ? (
            <h1 style={{ textAlign: "center" }}>
              You have already correctly answered today's question!
              <div/>
              Come back again tomorrow
            </h1>
          ) : (
            <div className="Quiz">
              <h1> Daily quiz to earn rewards! </h1>
              <div className="quiz_container">
                <h3 className="quiz_question">
                  {questionSets ? question?.Title : "Loading..."}
                </h3>
                <div
                  className="image_container"
                  style={{
                    backgroundImage: `url(${questionSets && question?.imageURL})`,
                  }}
                ></div>
                <div className="options_container">
                  <div
                    onClick={() => setSelectedAns(question?.Option1)}
                    className="option"
                    style={
                      selectedAns === question?.Option1
                        ? { backgroundColor: "white", color: "#e00a02" }
                        : {}
                    }
                  >
                    {questionSets ? question?.Option1 : "Loading..."}
                  </div>
                  <div
                    onClick={() => setSelectedAns(question?.Option2)}
                    className="option"
                    style={
                      selectedAns === question?.Option2
                        ? { backgroundColor: "#fff", color: "#e00a02" }
                        : {}
                    }
                  >
                    {questionSets ? question?.Option2 : "Loading..."}
                  </div>
                  <div
                    onClick={() => setSelectedAns(question?.Option3)}
                    className="option"
                    style={
                      selectedAns === question?.Option3
                        ? { backgroundColor: "#fff", color: "#e00a02" }
                        : {}
                    }
                  >
                    {questionSets ? question?.Option3 : "Loading..."}
                  </div>
                  <div
                    onClick={() => setSelectedAns(question?.Option4)}
                    className="option"
                    style={
                      selectedAns === question?.Option4
                        ? { backgroundColor: "#fff", color: "#e00a02" }
                        : {}
                    }
                  >
                    {questionSets ? question?.Option4 : "Loading..."}
                  </div>
                </div>
                {wrongAns && (
                  <div className="incorrect_ans_message">
                    <p>Your answer is incorrect</p>
                  </div>
                )}
    
                <div className="submit_btn">
                  <button onClick={correctAnswerHandle}>Submit</button>
                  {wrongAns && <button onClick={tryAgain}>Try Again</button>}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };

export default Quiz

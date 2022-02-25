import {db} from "../util/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

//     const GetVariables = () => {
//         const [Title, setTitle]=useState('');
//         const [ID, setID]=useState('');
//         const [Option1, setOption1]=useState('');
//         const [Option2, setOption2]=useState('');
//         const [Option3, setOption3]=useState('');
//         const [Option4, setOption4]=useState('');
//         const [Answer, setAnswer]=useState('');

//         db.collection('Questions').orderBy("ID","asc").get().then(snapshot=> {
//             setTitle(snapshot.data().Title);
//             setID(snapshot.data().ID);
//             setOption1(snapshot.data().Option1);
//             setOption2(snapshot.data().Option2);
//             setOption3(snapshot.data().Option3);
//             setOption4(snapshot.data().Option4);
//             setAnswer(snapshot.data().Answer);
//         })
//     }

// GetVariables();

    // const GetTitle = () => {
    //         db.collection('Questions').orderBy("ID","asc").get().then(snapshot=> {
    //             snapshot.forEach((doc) => console.log(doc.data()))
    //             setTitle(snapshot.data().Title);
    //         })
    // }

    // GetTitle();
    // const [Title, setTitle]=useState('');


//if wrong answer then try again message
const Quiz = () => {
    const questionsCollectionRef = collection(db, "Questions");
    const [questionSets, setQuestionSets]=useState([]);
    // const [correctAnswer, setCorrectDisplay]=useState('');
    //wrong is always Try again
    //correct is must manual set in database

    useEffect(() => {
        const getQuestionSets = async () => {
            const data = await getDocs(questionsCollectionRef);
            setQuestionSets(data.docs.map((doc) => ({...doc.data()})));
        }

        getQuestionSets()
    }, [])

    const isCorrect = () => {
        // console.log(Questions.Answer)
    }

    

    return (
        <div className="Quiz">
            <h1> Daily quiz to earn rewards! </h1>
            {questionSets.map((Questions) => {
                return (
                    <div>
                        <h1>Title: {Questions.Title}</h1>
                        <button>Option 1: {Questions.Option1}</button>
                        <br/>
                        <button>Option 2: {Questions.Option2}</button>
                        <br/>
                        <button>Option 3: {Questions.Option3}</button>
                        <br/>
                        <button>Option 4: {Questions.Option4}</button>
                        <br/>        
                            <div>
                                {Questions.Answer === Questions.Options}
                            </div>           
                    </div>
                );
            })}
        </div>
)

}

export default Quiz;
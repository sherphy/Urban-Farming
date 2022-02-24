import {db} from "../util/firebase";
import { useEffect, useState } from "react";
import { Title } from "@mui/icons-material";
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


    useEffect(() => {
        const getQuestionSets = async () => {
            const data = await getDocs(questionsCollectionRef);
            setQuestionSets(data.docs.map((doc) => ({...doc.data()})));
        }

        getQuestionSets()
    }, [])

    return (
        <div className="App">
            <h1> Daily quiz to earn rewards! </h1>
            {questionSets.map((Questions) => {
                return (
                    <div>
                        <h1>Title: {Questions.Title}</h1>
                    </div>
                );
            })}
        </div>
                // <input type="text" className='form-control' required
                // onChange={(e)=>setTitle(e.target.value)} value={Title}></input>
                // <br></br>
                // <label>Question ID</label>
                // <input type="text" className='form-control' required
                // onChange={(e)=>setID(e.target.value)} value={ID}></input>
                // <br></br>
                // <label>Option 1</label>
                // <input type="string" className='form-control' required
                // onChange={(e)=>setOption1(e.target.value)} value={Option1}></input>
                // <br></br>
                // <label>Option 2</label>
                // <input type="string" className='form-control' required
                // onChange={(e)=>setOption2(e.target.value)} value={Option2}></input>
                // <br></br>
                // <label>Option 3</label>
                // <input type="string" className='form-control' required
                // onChange={(e)=>setOption3(e.target.value)} value={Option3}></input>
                // <br></br>
                // <label>Option 4</label>
                // <input type="string" className='form-control' required
                // onChange={(e)=>setOption4(e.target.value)} value={Option4}></input>
                // <br></br>
                // <label>Answer</label>
                // <input type="number" className='form-control' required
                // onChange={(e)=>setAnswer(e.target.value)} value={Answer}></input>
                // <br></br>
)

}

export default Quiz;
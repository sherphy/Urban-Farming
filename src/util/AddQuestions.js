import React,{useState} from 'react'
import {db} from './firebase'

const AddQuestions = () => {

    const [Title, setTitle]=useState('');
    const [ID, setID]=useState('');
    const [Option1, setOption1]=useState('');
    const [Option2, setOption2]=useState('');
    const [Option3, setOption3]=useState('');
    const [Option4, setOption4]=useState('');
    const [Answer, setAnswer]=useState('');

    // for those that need image component, can manually add url: "string here"
    // with the image component stored in firebase storage
    // const [image, setImage]=useState(null);
    
    const [successMsg, setSuccessMsg]=useState('');
    let uploadError;

    // const types =['image/jpg','image/jpeg','image/png','image/PNG'];
    // const handleProductImg=(e)=>{
    //     let selectedFile = e.target.files[0];
    //     if(selectedFile){
    //         if(selectedFile&&types.includes(selectedFile.type)){
    //             setImage(selectedFile);
    //             setImageError('');
    //         }
    //         else{
    //             setImage(null);
    //             setImageError('please select a valid image file type (png or jpg)')
    //         }
    //     }
    //     else{
    //         console.log('please select your file');
    //     }
    // }

    const handleAddQuestions=(e)=>{
        e.preventDefault();
        // console.log(title, description, price);
        // console.log(image);
        // const uploadTask=storage.ref(`product-images/${image.name}`).put(image);
        // uploadTask.on('state_changed',snapshot=>{
        //     const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        //     console.log(progress);
        // },error=>setUploadError(error.message),()=>{
        //     storage.ref('product-images').child(image.name).getDownloadURL().then(url=>{
                db.collection('Questions').add({
                    Title,
                    ID,
                    Option1,
                    Option2,
                    Option3,
                    Option4,
                    Answer
                }).then(()=>{
                    setSuccessMsg('Question added successfully');
                    setTitle('');
                    setID('');
                    setOption1('');
                    setOption2('');
                    setOption3('');
                    setOption4('');
                    setAnswer('');
                    // document.getElementById('file').value='';
                    // setImageError('');
                    // setUploadError('');
                //     setTimeout(()=>{
                //         setSuccessMsg('');
                //     },3000)
                // }).catch(error=>setUploadError(error.message));
                 })
    }
  
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Add Questions</h1>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddQuestions}>
                <label>Question Title</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={Title}></input>
                <br></br>
                <label>Question ID</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setID(e.target.value)} value={ID}></input>
                <br></br>
                <label>Option 1</label>
                <input type="string" className='form-control' required
                onChange={(e)=>setOption1(e.target.value)} value={Option1}></input>
                <br></br>
                <label>Option 2</label>
                <input type="string" className='form-control' required
                onChange={(e)=>setOption2(e.target.value)} value={Option2}></input>
                <br></br>
                <label>Option 3</label>
                <input type="string" className='form-control' required
                onChange={(e)=>setOption3(e.target.value)} value={Option3}></input>
                <br></br>
                <label>Option 4</label>
                <input type="string" className='form-control' required
                onChange={(e)=>setOption4(e.target.value)} value={Option4}></input>
                <br></br>
                <label>Answer</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setAnswer(e.target.value)} value={Answer}></input>
                <br></br>
                {/* <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required
                onChange={handleProductImg}></input> */}
                
                {/* {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>} */}
                <br></br>           
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
                </div>
            </form>
            {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}

        </div>
    )
}

export default AddQuestions;
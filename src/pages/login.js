// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { useUserAuth } from "../util/userAuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { logIn } = useUserAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       await logIn(email, password);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <>
//       <div className="p-4 box">
//         <h2 className="mb-3">Login</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Control
//               type="email"
//               placeholder="Email address"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Control
//               type="password"
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <div className="d-grid gap-2">
//             <Button variant="primary" type="Submit">
//               Log In
//             </Button>
//           </div>
//         </Form>
//         <hr />
//       </div>
//       <div className="p-4 box mt-3 text-center">
//         Don't have an account? <Link to="/signup">Sign up</Link>
//       </div>
//     </>
//   );
// };

// export default Login; 

import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../util/firebase'
import {useNavigate} from 'react-router-dom'
import './login.css'
// import {setPersistence} from "firebase/auth";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleLogin=(e)=>{
        e.preventDefault();
        // console.log(email, password);
        auth.setPersistence('local');
        auth.signInWithEmailAndPassword(email,password).then(()=>{
            setSuccessMsg('Login Successfull. You will now automatically get redirected to Home page');
            setEmail('');
            setPassword('');
            setErrorMsg('');
            setSuccessMsg('');
            navigate('/dashboard');
        }).catch(error=>setErrorMsg(error.message));
    }

    return (
        <div className="sign">
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {/* redirect when authorised */}
            {/* still debugging */}
            {auth.currentUser&& <>
                {navigate('/dashboard')}
            </>}
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                {navigate('/dashboard')};
                <br></br>
            </>}
            <form className='form-group' autoComplete="off"
            onSubmit={handleLogin}>               
                <label>Email</label>
                <input type="email" className='form-control' required
                onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span><Link to="/signup" className='link'>Don't have an account? Sign up!</Link></span>
                    <br/>
                    <button type="submit" className='btn btn-success btn-md'>LOGIN</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
    )
}


export default Login;
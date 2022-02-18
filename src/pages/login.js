import React, { useState, createContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../util/userAuthContext";
import {auth} from '../util/firebase'
import './login.css'

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
  };

  return (
      <div className="sign">
      <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
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
